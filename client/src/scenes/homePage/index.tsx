import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { Navigate } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";

const HomePage = () => {
  const token = useSelector((state: RootState) => state.token);
  const _id = useSelector((state: RootState) => state.user?._id);
  const picturePath = useSelector(
    (state: RootState) => state.user?.picturePath
  );
  const isNonMobileScreen = useMediaQuery("(min-width:992px)");

  if (token) {
    return (
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreen ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
            {_id && picturePath && (
              <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
            )}
          </Box>
          <Box
            flexBasis={isNonMobileScreen ? "42%" : undefined}
            mt={isNonMobileScreen ? undefined : "2rem"}
          >
            {picturePath && <MyPostWidget picturePath={picturePath} />}
            {_id && <PostsWidget userId={_id} />}
          </Box>
          {isNonMobileScreen && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  }

  return <Navigate to="/" />;
};

export default HomePage;
