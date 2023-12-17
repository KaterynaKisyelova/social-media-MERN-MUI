import { Box } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const token = useSelector((state: RootState) => state.token);

  if (token) {
    return (
      <Box>
        <Navbar></Navbar>
      </Box>
    );
  }

  return <Navigate to="/" />;
};

export default HomePage;
