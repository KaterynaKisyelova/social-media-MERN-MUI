import { useState } from "react";
import {
  Box,
  Button,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/slices/authSlice";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { AppDispatch } from "../../state";
import {
  CREATE_ACCOUNT_TEXT,
  LOGIN_ACCOUNT_TEXT,
  LOGIN_TEXT,
  REGISTER_TEXT,
  formLoginFields,
  formRegisterFields,
} from "../../utils/const";
import { InitialValuesLogin, InitialValuesRegister } from "../../types";
import InputField from "./InputField";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister: InitialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin: InitialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState(REGISTER_TEXT);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    neutral: { medium },
    primary: { main, light },
    background: { alt },
  } = useTheme().palette;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === LOGIN_TEXT;

  const register = async (
    values: InitialValuesRegister,
    onSubmitProps: FormikHelpers<InitialValuesRegister>
  ) => {
    const formData = new FormData();

    for (const value in values) {
      formData.append(value, values[value as keyof InitialValuesRegister]);
    }

    if (values?.picture) {
      formData.append("picturePath", values?.picture?.name);
    }

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      { method: "POST", body: formData }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (!savedUser) {
      return;
    }

    setPageType(LOGIN_TEXT);
  };

  const login = async (
    values: InitialValuesLogin,
    onSubmitProps: FormikHelpers<InitialValuesLogin>
  ) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (!loggedIn) {
      return;
    }

    dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
    navigate("/home");
  };

  const handleFormSubmit = async (
    values: InitialValuesLogin | InitialValuesRegister,
    onSubmitProps: FormikHelpers<InitialValuesLogin | InitialValuesRegister>
  ) => {
    if (!isLogin && isRegister(values)) {
      await register(
        values,
        onSubmitProps as FormikHelpers<InitialValuesRegister>
      );
    } else {
      await login(values, onSubmitProps as FormikHelpers<InitialValuesLogin>);
    }
  };

  function isRegister(
    values: InitialValuesRegister | InitialValuesLogin
  ): values is InitialValuesRegister {
    return (values as InitialValuesRegister).firstName !== undefined;
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            {!isLogin &&
              isRegister(values) &&
              formRegisterFields.map(({ name, label }) => (
                <InputField
                  label={label}
                  key={label}
                  handleBlur={handleBlur}
                  value={values[name]}
                  handleChange={handleChange}
                  name={name}
                  touched={
                    (touched as FormikTouched<InitialValuesRegister>)[name]
                  }
                  errors={(errors as FormikErrors<InitialValuesRegister>)[name]}
                />
              ))}
            {!isLogin && isRegister(values) && (
              <Box
                gridColumn="span 2"
                border={`1px solid ${medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                  acceptedFiles=".jpg,.jpeg,.png"
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values?.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values?.picture?.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}
            {formLoginFields.map(({ label, name, type }) => (
              <InputField
                label={label}
                key={label}
                type={type}
                handleBlur={handleBlur}
                value={values[name]}
                handleChange={handleChange}
                name={name}
                touched={(touched as FormikTouched<InitialValuesLogin>)[name]}
                errors={(errors as FormikErrors<InitialValuesLogin>)[name]}
              />
            ))}
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: main,
                color: alt,
                "&:hover": { color: main },
              }}
            >
              {isLogin ? LOGIN_TEXT : REGISTER_TEXT}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? REGISTER_TEXT : LOGIN_TEXT);
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: main,
                "&:hover": {
                  cursor: "pointer",
                  color: light,
                },
              }}
            >
              {isLogin ? CREATE_ACCOUNT_TEXT : LOGIN_ACCOUNT_TEXT}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
