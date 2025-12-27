import CustomSelect from "./CustomSelect";
import { MenuItem, Typography } from "@mui/material";

interface propTypes {
  title: string;
  name: string;
  id: string;
  formik: any;
  menu?: any[];
  menuDict?: any;
  value?: any;
  handleChange?: any;
  readOnly?: boolean;
  showError?: boolean;
  removeLabel?: boolean;
  margin?: string;
}

const FormikCustomSelectField = ({
  title,
  name,
  id,
  formik,
  menu,
  menuDict,
  handleChange,
  value,
}: propTypes) => {
  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: "28px",
          textAlign: "left",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
      <CustomSelect
        id={id}
        value={value ? value : formik.values?.[name]}
        name={name}
        error={Boolean(formik.touched?.[name] && formik.errors?.[name])}
        helperText={formik.touched?.[name] && formik.errors?.[name]}
        fullWidth
        onChange={handleChange ? handleChange : formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <MenuItem value="" disabled>
          Select
        </MenuItem>
        {menu
          ? menu.map((item: string, key: number) => {
              return (
                <MenuItem key={key + new Date().getTime()} value={item}>
                  {item}
                </MenuItem>
              );
            })
          : Object.keys(menuDict).map((item: string, key: number) => {
              return (
                <MenuItem
                  key={key + new Date().getTime()}
                  value={menuDict[item]}
                >
                  {item}
                </MenuItem>
              );
            })}
      </CustomSelect>

      {/* {showError && (
        <FormHelperText
          error={Boolean(formik.touched?.[name] && formik.errors?.[name])}
        >
          {formik.touched?.[name] && formik.errors?.[name]}
        </FormHelperText>
      )} */}
    </>
  );
};

export default FormikCustomSelectField;
