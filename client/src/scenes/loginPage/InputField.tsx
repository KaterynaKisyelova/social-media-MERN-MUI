import { TextField } from "@mui/material";

type Props = {
  label: string;
  handleBlur: (e: React.FocusEvent) => void;
  value: string;
  name: string;
  touched?: boolean;
  errors?: string;
  handleChange: (e: React.ChangeEvent) => void;
  span?: number;
  type?: string;
};

const InputField = ({
  label,
  handleBlur,
  value,
  name,
  touched,
  errors,
  handleChange,
  span = 1,
  type,
}: Props) => {
  return (
    <TextField
      label={label}
      onBlur={handleBlur}
      onChange={handleChange}
      type={type}
      value={value}
      name={name}
      error={touched && Boolean(errors)}
      helperText={touched && errors}
      sx={{ gridColumn: `span ${span}` }}
    ></TextField>
  );
};

export default InputField;
