import React, { useEffect, useState } from "react";
import { render } from "@testing-library/react";
import { Formik } from "formik";
import { useParams } from "react-router";
import { Button, ButtonGroup, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import * as Yup from 'yup';
import MyFieldInput from "../../../utils/MyFieldInput";
import { Link, useHistory } from "react-router-dom";
import MyTextArea from "../../../utils/MyTextArea";
import { convertFromRaw, convertToRaw, EditorState,ContentState } from "draft-js";
import TextEditor from "../../../utils/TextEditor";
import { observer } from "mobx-react-lite";
import Chronicle from "../../../models/chronicle";


export default observer(function ChronicleForm(){
    
        const {chronicleStore, utilsStore} = useStore();
        const {selectedChronicle,loadChronicle,loading,loadingInitial
        ,createChronicle,updateChronicle} = chronicleStore;
        const {id} = useParams<{id: string}>();
        const history= useHistory();
        const {outpostId} = useParams<{outpostId: string}>();

    const [chronicle,setChronicle]= useState({
        id:0,
        name: '',
        // description: '',
        // publicationDate: new Date().toISOString().split('T')[0],
        publicationDate: new Date(),
    })

    useEffect(()=>{
        if(id && outpostId) 
            loadChronicle(parseInt(outpostId),parseInt(id))
            .then( ch=>{
                //usuwa nulle
                ch = JSON.parse(JSON.stringify(ch).replace(/:null/gi, ":\"\"")); 
                console.log(ch);
                setChronicle(ch!) ;
                try{
                    let obj = JSON.parse(ch!.description);
                    console.log(convertFromRaw(obj))
                    _setEditorState(EditorState.createWithContent(convertFromRaw(obj)));
                }
                catch(e)
                {
                    _setEditorState(EditorState.createWithContent(ContentState.createFromText(ch!.description)));
                }
                // _setEditorState(JSON.parse(ch!.description));
            });
    },[id,loadChronicle])
        
    const chronicleValidationSchema = Yup.object().shape({
        name: Yup.string().required(),
    })

    const [editorState, _setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    
    function dataStringify(editorState:any)
    {
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        // const obj = JSON.parse(data);
        return data;
    }

    function prepareData(val:any,desc:any){
       return {...val,description: dataStringify(desc)}
    }

    

    function handleFormSubmit(val: any){
        let chronicle = prepareData(val,editorState);
        if(!chronicle.id) 
        {
            chronicle.publicationDate= new Date();
            console.log(chronicle.publicationDate)
            createChronicle(chronicle,parseInt(outpostId)).then(()=> history.push(`/outposts/${outpostId}/chronicle`));
        }
        else 
        {
            chronicle.publicationDate= new Date();
            updateChronicle(chronicle,parseInt(outpostId),chronicle.id).then(()=> history.push(`/outposts/${outpostId}/chronicle`))
        }
    }


    if(loadingInitial) return <LoadingComponent content="Wczytywanie formularza"/>;

    return(
        <Segment clearing>
            <Formik 
                validationSchema={chronicleValidationSchema} 
                enableReinitialize 
                initialValues={chronicle} 
                onSubmit={val =>handleFormSubmit(val)}
            >
            {({handleSubmit, isValid, dirty, isSubmitting})=>
            (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyFieldInput  placeholder="Nazwa" name="name" label='Tytuł kroniki'/> 

                    <TextEditor
                        editorState={editorState}
                        setEditorState={_setEditorState}
                    />

                    <ButtonGroup>
                        <Button
                       //disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} positive content='Zatwierdź'/>
                        <Button as={Link} to={`/outposts/${outpostId}/chronicle`} basic color='grey' content='Cofnij'/>
                    </ButtonGroup>  
                </Form>
            )}
            </Formik>
        </Segment>
    );
});

// export default observer (function OutpostDetails()
// {

//     const {chronicleStore} = useStore();
//     const {selectedChronicle,loadChronicle} = chronicleStore;
//     const {id} = useParams<{id: string}>();
//     const {outpostId} = useParams<{outpostId: string}>();

//     useEffect(()=>{
//         if(id && outpostId) loadChronicle(parseInt(outpostId),parseInt(id));
//     },[id,loadChronicle])
    
//     //obsługa w sytuacji kiedy outpost nie istnieje w kodzie
//     if(!selectedChronicle) return <LoadingComponent/>;

//     return (
//         <Card fluid>
//             <Card.Content>
//                     <Card.Header>
//                         {selectedChronicle?.name}
//                     </Card.Header>
//                     <Card.Meta>
//                         {'Kartka z kalendarza dzień: '+ selectedChronicle?.publicationDate}
//                     </Card.Meta>
//                     <Card.Description>
//                         {selectedChronicle?.description}
//                     </Card.Description>
//             </Card.Content>
//             <Card.Content extra>
//                 <Button.Group>
//                         <Button as={Link} to={`/editOutpost/${id}`}  basic color='red' content='Edit'/>
//                         <Button as={Link} to={`/outposts`} basic color='grey' content='cancel'/>
//                 </Button.Group>
//             </Card.Content>
//         </Card>
//     );
// });