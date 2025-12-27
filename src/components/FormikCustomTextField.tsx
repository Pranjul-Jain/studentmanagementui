import { useState } from "react";
import CustomFormLabel from "./CustomFormLabel";
import CustomTextField from "./CustomTextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface propTypes {
  formik: any;
  title: string;
  name: string;
  id: string;
  placeholder: string;
  readOnly?: boolean;
  rows?: number;
  type?: string;
  props?: any;
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  multiline?: boolean;
  touched?: Boolean;
  value?: any;
  disabled?: boolean;
}

const FormikCustomTextField = ({
  formik,
  title,
  name,
  id,
  placeholder,
  readOnly,
  type,
  disabled = false,
  handleChange,
  handleBlur,
  rows,
  value,
  multiline,
  ...props
}: propTypes) => {
  return (
    <>
      <CustomFormLabel>{title}</CustomFormLabel>
      <CustomTextField
        id={id}
        placeholder={placeholder}
        name={name}
        value={value ? value : formik.values?.[name]}
        variant="outlined"
        error={Boolean(formik.touched?.[name] && formik.errors?.[name])}
        helperText={formik.touched?.[name] && (formik.errors?.[name] as string)}
        readOnly={readOnly ? true : false}
        fullWidth
        onBlur={handleBlur ? handleBlur : formik.handleBlur}
        onChange={handleChange ? handleChange : formik.handleChange}
        type={type ? type : "text"}
        multiline={multiline}
        rows={rows ? rows : 1}
        {...props}
      />
    </>
  );
};

export default FormikCustomTextField;
