import  './App.css';
import  { useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './app/layout/NavBar';
import OutpostDashboard from './app/features/outposts/dashboard/OutpostDashboard';
import LoadingComponent from './app/layout/LoadingComponent';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './app/features/home/HomePage';
import OutpostForm from './app/features/outposts/form/OutpostForm';
import OutpostDetails from './app/features/outposts/details/OutpostDetails';
import ChroniclesDashBoard from './app/features/chronicles/dashboard/ChroniclesDashboard';
import ChroniclesVisitorDashBoard from './app/features/chronicles/dashboard/ChroniclesVisitorDashboard';
import ChroniclesDetails from './app/features/chronicles/details/ChroniclesDetails';
import ChronicleForm from './app/features/chronicles/form/ChronicleForm';
import LoginForm from './app/features/user/LoginForm';
import RegisterForm from './app/features/user/RegisterForm';
import AccountDetails from './app/features/user/AccountDetails';
import AdminDashboard from './app/features/user/admin/AdminDashboard';
import OutpostMapPanel from './app/features/mapOutposts/OutpostMapPanel';
import NotFound from './app/features/errors/NotFound';

//System powstał na Wydziale Informatyki Politechniki Białostockiej.

function App() {
  const location = useLocation();
  
  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   });
  // });
  const {userStore,utilsStore} = useStore();

  useEffect(()=>{
    if(utilsStore.token)
        {
          userStore.getUser().finally(()=>utilsStore.setLoadedAcc())
        }
        else utilsStore.setLoadedAcc();
  },[utilsStore,userStore])

  if(!utilsStore.accountLoading) return <LoadingComponent content="Loading account..." />

  return (
  <Switch>

{/* USER */}
     <Route exact path={"/login"} component={LoginForm}></Route>
     <Route exact path={"/register"} component={RegisterForm}></Route>
     
     <Route exact path="/" component={HomePage}></Route>

    <>
        <NavBar />
        <Container style={{height:'80vh',marginTop:'10vh',marginBottom:'-10vh'}}>
         <Switch >
          <Route exact path="/outposts/map" component={OutpostMapPanel}></Route>


{/* PLACÓWKI */}
          <Route exact path="/outposts" component={OutpostDashboard}></Route>
          <Route exact path="/outposts/:id" component={OutpostDetails}></Route>
          
          <Route key={location.key} exact path={["/editOutpost/:id","/outpostCreate"]} component={OutpostForm}></Route>
          
{/* KRONIKI */}
          <Route exact path={"/chronicles"} component={ChroniclesVisitorDashBoard}></Route>
          <Route exact path={"/outposts/:outpostId/chronicle"} component={ChroniclesDashBoard}></Route>
          <Route exact path={"/outposts/:outpostId/chronicle/:id/details"} component={ChroniclesDetails}></Route>

          <Route key={location.key+'1'} 
          exact path={["/outposts/:outpostId/editChronicle/:id","/outposts/:outpostId/chronicleCreate"]} 
          component={ChronicleForm}></Route>
{/* USER */}
          <Route exact path={"/accountDetails"} component={AccountDetails}></Route>
          <Route exact path={"/adminDashboard"} component={AdminDashboard}></Route>
       

{/* Nie znaleziono ścieżki */}
          <Route component={NotFound} >
          </Route>
          
          </Switch>

        </Container>
    </>
    </Switch>
  );
}

export default observer(App);
