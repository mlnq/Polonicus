import { ContentState, convertFromRaw, Editor, EditorState } from "draft-js";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { store, useStore } from "../../../stores/store";
import TextEditor from "../../../utils/TextEditor";
import TextView from "../../../utils/TextView";



export default observer (function OutpostDetails()
{
    const history = useHistory();

    const {chronicleStore,userStore} = useStore();
    const {selectedChronicle,loadChronicle} = chronicleStore;
    const {isLogged} = userStore;
    const {id} = useParams<{id: string}>();
    const {outpostId} = useParams<{outpostId: string}>();

    const [editorState,setEditorState] = useState<EditorState>
    (EditorState.createWithContent(ContentState.createFromText('Brak treści... uzupełnij dane edytując wpis')));


 

    useEffect(()=>{
        if(id && outpostId) 
        {
            loadChronicle(parseInt(outpostId),parseInt(id)).then(
                ch=>{
                    try{
                        console.log(ch)

                        let obj = JSON.parse(ch!.description);
                        console.log(convertFromRaw(obj))
                        setEditorState(EditorState.createWithContent(convertFromRaw(obj)));
                    }
                    catch(e)
                    {
                        setEditorState(EditorState.createWithContent(ContentState.createFromText(ch!.description)));
                    }
                }

            )
        };
    },[id,loadChronicle])

    let month:any =selectedChronicle?.publicationDate!.getMonth();
    let DateString = ('0' + selectedChronicle?.publicationDate.getDate()).slice(-2) + '/'
    + ('0' + (month+1)).slice(-2) + '/'
    + selectedChronicle?.publicationDate.getFullYear();

    //obsługa w sytuacji kiedy outpost nie istnieje w kodzie
    if(!selectedChronicle) return <LoadingComponent/>;


    function readRawDataJSON(desc:any){
        let obj = JSON.parse(desc);
        let contentState = convertFromRaw(obj);    
        setEditorState(EditorState.createWithContent(contentState));
    }
    // ///TEST
    // import storedState from "../dashboard/test.json";
    // let obj:any; 
    // obj= storedState;
    // const contentState = convertFromRaw(obj);
    // const editorStatee = EditorState.createWithContent(contentState);
    
    return (
        <Card fluid>
            <Card.Content>
                    <Card.Header>
                        {selectedChronicle?.name}
                    </Card.Header>
                    <Card.Meta>
                        {'Kartka z kalendarza dzień: '+ DateString}
                    </Card.Meta>
                    <Card.Description>
                        {
                        selectedChronicle.description ?
                        <TextView data={editorState}/>
                        :null
                        }
                        {/* {selectedChronicle?.description} */}
                    </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                        {
                            isLogged? 
                            (
                                <>
                            <Button as={Link} to={`/outposts/${outpostId}/editChronicle/${id}`}  basic color='red' content='Edit'/>
                                </>
                            )
                            :
                            (null)
                        }
                        <Button onClick={()=>history.goBack()} basic color='grey' content='Powrót'/>
                </Button.Group>
            </Card.Content>
            

           
            {/* <TextTestEditor ></TextTestEditor> */}
        </Card>
    );
});