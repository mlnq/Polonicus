import React from "react";
import { useField } from "formik";
import { Form, Input, Label } from "semantic-ui-react";
import { isPropertySignature } from "typescript";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
  children?: React.ReactNode;
}

export default function MyField(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field 
    
    error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
     
      <textarea {...field} {...props} />
     {meta.error && meta.touched ? <Label color='red' basic>{meta.error}</Label> : null}
    </Form.Field>
  );
}
