import { useState } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import MyDropzone from "./MyDropzone";


interface Props{
    setFiles: (file: any)=>void;
    files: any[];
  }

export default function PhotoUploader({setFiles,files}:Props)
{


    return(
        <Grid>
            <Grid.Column width={6}>
                <Header content="Dodaj zdjęcie"/>
                <MyDropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={6}>
                {
                    files && files.length > 0 &&
                    (
                        <Image src={files[0].preview} />
                    )
                }
            </Grid.Column>
        </Grid>
    );
} 