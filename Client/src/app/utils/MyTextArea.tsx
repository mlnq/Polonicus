import React from "react";
import { useField } from "formik";
import { Form, Input, Label } from "semantic-ui-react";
import { isPropertySignature } from "typescript";
import TextEditor from "./TextEditor";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
  children?: React.ReactNode;
  editorState?:any;
}

export default function MyField(props: Props) {
  const [field, meta] = useField(props.name);
  
  return (
    <Form.Field 
    
    error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
         {meta.error && meta.touched ? <Label color='red' basic>{meta.error}</Label> : null}
    </Form.Field>
  );
}
