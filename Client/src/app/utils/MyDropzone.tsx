import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon } from 'semantic-ui-react';


interface Props{
  setFiles: (file: any)=>void;
}

export default function MyDropzone({setFiles}:Props) {
  
  
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setFiles(acceptedFiles.map((file:any) =>Object.assign(file,{
      preview: URL.createObjectURL(file)
    })));
  }, [setFiles])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div {...getRootProps()} className={isDragActive? `dropBoxDrop`:`dropBox`}>
      <input {...getInputProps()} />
      {
        <>
        <Icon name='file' size='huge'></Icon>
        
        {isDragActive?
        <p>Upuść plik</p>:
        <p>Wrzuć tutaj zdjęcie</p>
        }
        </>
      }
    </div>
  )
}