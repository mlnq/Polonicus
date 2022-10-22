import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Icon, Item, Label } from "semantic-ui-react";
import Chronicle from "../../../models/chronicle";
import { useStore } from "../../../stores/store";
import axios from "axios";
import { Console } from "console";
import { useTranslation } from "react-i18next";



interface Props{
  chronicle: Chronicle,
  target:number,
  chronicleDelete: (event: SyntheticEvent<HTMLButtonElement>,id: number) => void,
}


export default observer( 
function ChroniclesItem({chronicle,target,chronicleDelete}:Props)
{
  const { chronicleId, } = useParams<{ chronicleId: string }>();
  const {userStore,chronicleStore} =useStore();
  const {baseURL} = chronicleStore;
  const {isLogged}=userStore;
  const [t, i18n] = useTranslation('common');

return(
<Item >
              {
                chronicle.imagePath === null || chronicle.imagePath === '0' ?
                ( <Item.Image circular className="imageFlex"
                  size="small"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                ></Item.Image>)
                :
                ( <Item.Image circular className="imageFlex"
                  size="small"
                  src={`${baseURL}/${chronicle.imagePath}`}
                ></Item.Image>)
              }
           

            <div className='content'>
              <Item.Header>{chronicle.name}</Item.Header>
              <Item.Meta>
                <Label className="date">
                  <span>
                  <Icon name='calendar alternate outline' style={{ display: 'inline'}}/>
                  <span style={{marginLeft: '5px' }}>
                  {chronicleStore.dateFormat(chronicle)}
                  </span>
                  </span>
                </Label>
              </Item.Meta>
              <Item.Description>

                {/* {chronicle.description.slice(0, 10)}... */}
              </Item.Description>
            </div>
            
            <Item.Extra>
              <Button.Group vertical  floated="right">
                
                {
                  isLogged? (
                    <Button
                      id={chronicle.id}
                      loading={target === chronicle.id}
                      onClick={(event) =>{
                        chronicleDelete(event, chronicle.id);
                        }
                      }
                      floated="right"
                      className="bgColor"
                      content={t("chronicleItem.delete")}
                      icon="trash"
                    />)
                  :
                  null
                }
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}/editChronicle/${chronicle.id}`}
                  floated="right"
                  content={t("chronicleItem.edit")}
                  className="bgColor"
                  icon="edit"
                />
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}/chronicle/${chronicle.id}/details`}
                  floated="right"
                  content={t("chronicleItem.display")}
                  className="bgColor"
                  icon="level down alternate"
                />
              </Button.Group>
              
            </Item.Extra>
</Item>);
});