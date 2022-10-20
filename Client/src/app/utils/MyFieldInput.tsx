import React, { useState } from "react";
import { useField } from "formik";
import { Form,Label,Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?:string;
  children?: React.ReactNode;
}

export default function MyFieldInput(props: Props) {
  const [field, meta] = useField(props.name);
  const [visible,setVisible]=useState(false);

  const xd = props.type;
  return (
    <Form.Field 
    
    error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
     
        <div className="ui icon input">
        {
          props.type !== 'password' ? 
          (  
            <input {...field} {...props}>
            </input>
          ):null
        }
      {
        props.type === 'password' ? 
        (
          <>
          <input {...field} {...props} {...{type:`${visible ? "text" : "password"}`}} >
           </input>
          <i className={`large toggle ${!visible?"eye":"eye slash"} icon `} onClick={()=>{setVisible(!visible)}}/>
          </>
        ):null
      }
        </div>
     {meta.error && meta.touched ? 
     <Label color='red' basic>{meta.error}</Label> : null}
    </Form.Field>
  );
}


