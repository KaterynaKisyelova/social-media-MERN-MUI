import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 992px)");
  const {
    background: { alt },
  } = useTheme().palette;

  return (
    <Box>
      <Box width="100%" p="1rem 6%" textAlign="center" backgroundColor={alt}>
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
