import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router";
import {
  Item,
  Segment,
} from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChroniclesItem from "./ChroniclesItem";
import ChroniclesVisitorItem from "./ChroniclesVisitorItem";

export default observer(function ChroniclesList() {
  const { chronicleStore } = useStore();
  const { chronicles, deleteChronicle,loadingInitial,allChronicles } = chronicleStore;

  const { outpostId } = useParams<{ outpostId: string }>();

  const [target, setTarget] = useState(0);

  function handleChronicleDelete(event: SyntheticEvent<HTMLButtonElement>,id: number) 
  {
    let currentButton = parseInt(event.currentTarget.id);
    setTarget(currentButton);
    deleteChronicle(id,parseInt(outpostId));
    
  }




  if (loadingInitial)
    return <LoadingComponent content={"loading Polonicus"} />;
  if (chronicles.length === 0)
    return <div>"placówka nie posiada jeszcze zadnych wpisów"</div>;
  return (
    <Segment>
      <Item.Group divided horizontal>
        {
        allChronicles?
        (
          chronicles.map((chronicle) => (
          <ChroniclesVisitorItem key={chronicle.id} chronicle={chronicle} target={target}
          />))
        )
        :
        (
        chronicles.map((chronicle) => (
          <ChroniclesItem key={chronicle.id} chronicle={chronicle} target={target}
          chronicleDelete={handleChronicleDelete}
          />))
        )
          
        }
      </Item.Group>
    </Segment>
  );
});
