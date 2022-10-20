import React from "react";
import { useField } from "formik";
import { Form,Label } from "semantic-ui-react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";


interface Props {
    dateFormat?:string;
    label?: string;
    locale?:string;
    name?: string;
    children?: React.ReactNode;
  }

export default function MyDateInput(props: Partial<ReactDatePickerProps & Props> ) {
  const [field, meta, helpers] = useField(props.name!);

  return (
      <Form.Field error={meta.touched && !!meta.error}>
         <label>{props.label}</label>
          <ReactDatePicker
              {...field}
              {...props}
              selected={(field.value && new Date(field.value)) || new Date()}
              onChange={value => helpers.setValue(value)}
          />
          {meta.error && meta.touched ? 
          <Label color='red' basic>{meta.error}</Label> : null}
      </Form.Field>
  )
}