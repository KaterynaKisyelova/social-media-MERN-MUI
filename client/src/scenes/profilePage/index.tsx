import { Navigate } from "react-router-dom";
import { RootState } from "../../state";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const ProfilePage = () => {
  const token = useSelector((state: RootState) => state.token);

  if (token) {
    return <Box></Box>;
  }

  return <Navigate to="/" />;
};

export default ProfilePage;
