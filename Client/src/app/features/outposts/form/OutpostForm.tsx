import { Formik,Form, Field, ErrorMessage} from "formik";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent,useEffect,useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, ButtonGroup, FormField, Message, Segment } from "semantic-ui-react";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";
import * as Yup from 'yup';
import MyFieldInput from "../../../utils/MyFieldInput";
import MyFieldTextArea from "../../../utils/MyFieldTextArea";
import LoadingComponent from "../../../layout/LoadingComponent";
import MyFieldSelect from "../../../utils/MyFieldSelect";
import { categoryOptions } from "../../../utils/categoryOptions";
import FileSaver from "file-saver";
import { countryOptions } from "../../../utils/countryOptions";

export default observer( function OutpostForm(){

    const {outpostStore} = useStore();
    const {createOutpost,updateOutpost,loading,loadOutpost,loadingInitial,getLongLat} = outpostStore;
    
    const history= useHistory();
    const {id} = useParams<{id: string}>();

    const [validCoords,setValidCoords] =useState(true);
    
    const [outpost, setOutpost] = useState({
        id:0,
        name: '',
        description: '',
        country: '',
        city: '',
        street: '',
        postalCode:'',
        category:''
    })

    const outpostValidationSchema = Yup.object().shape({
        name: Yup.string().required('Nazwa placówki jest wymagana!'),
        description: Yup.string().required('Opis placówki jest wymagane!'),
        country: Yup.string().required('Kraj jest wymagany!'),
        city: Yup.string().required('Miasto jest wymagane!'),
        street: Yup.string().required('Ulica jest wymagana!'),
        category: Yup.string().required('Kategoria jest wymagana!'),
    })

    useEffect(()=>{
        if(id!== undefined) loadOutpost(parseInt(id)).then(
            o=>{
                //usuwa nulle
                o = JSON.parse(JSON.stringify(o).replace(/:null/gi, ":\"\"")); 
                console.log(o);
            setOutpost(o!) ;
        });
        
    },[id,loadOutpost])

    async function handleFormSubmit(outpost: Outpost){
        let coords= await getLongLat(outpost);
        console.log(coords)
        if(coords)
        {
            if(!outpost.id) createOutpost(outpost).then(()=> history.push(`/outposts`))
            else updateOutpost(outpost).then(()=> history.push(`/outposts`))
            setValidCoords(true);
        }
        else setValidCoords(false);
    }
    
    // var helper:Array<any>=[];
    // var countriesInfo = require('countries-information');
    // countriesInfo=countriesInfo.getAllCountries();
    // countriesInfo.forEach((e:any) => {
    //     helper.push({text: e.name,
    //                 value: e.name,
    //                 emoji:e.emoji, 
    //                 ioc:e.ioc,
    //                 countryCallingCode:e.countryCallingCodes});
    // });
    // var blob = new Blob([JSON.stringify(helper)],{type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(
    //   blob,
    //   `Countries_.json`
    // );
    // console.log(helper);

    if(loadingInitial) return <LoadingComponent content="Wczytywanie formularza"/>;


    return(
        <Segment clearing>
            {
                !validCoords ? 
                (<Message negative>
                    <Message.Header>Błąd formularza</Message.Header>
                    <p>Wprowadzono zły adres</p>
                </Message>)
                :
                null
            }
            
            <Formik 
            validationSchema={outpostValidationSchema} 
            enableReinitialize 
            initialValues={outpost} 
            onSubmit={values =>handleFormSubmit(values)} >
                {({handleSubmit, isValid, dirty, isSubmitting})=>
                (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                     
                        <MyFieldInput  placeholder="Nazwa" name="name" label='Nazwa placówki'/> 
                        <MyFieldSelect options={categoryOptions} placeholder="Kategoria Placówki" name="category" label='Kategoria'/>
                        {/* <MyFieldSelect options={countryOptions} placeholder="Kraje" name="Kraje" label='Kraje'/> */}
                        <MyFieldTextArea rows={4}  placeholder="Opis" name="description" label='Opis'/> 
                        <MyFieldInput  placeholder="Kraj" name="country" label='Kraj'/> 
                        <MyFieldInput  placeholder="Miasto" name="city" label='Miasto'/> 
                        <MyFieldInput  placeholder="Ulica" name="street" label='Ulica'/> 
                        {/* <MyFieldInput  placeholder="Kategoria Placówki" name="category" label='Kategoria'/>  */}
                        <ButtonGroup>
                            <Button  
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} positive content='Zatwierdź'/>
                            <Button as={Link} to={`/outposts`} basic color='grey' content='Cofnij'/>
                        </ButtonGroup>  
                    </Form>
                )}
            </Formik>
        </Segment>
    )
});