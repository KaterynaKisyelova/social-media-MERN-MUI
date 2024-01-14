import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/slices/authSlice";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import {
  PersonAddAltOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";

type Props = {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
};

const Friend = ({ friendId, name, subtitle, userPicturePath }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    primary: { light, dark },
    neutral: { main, medium },
  } = useTheme().palette;
  const friends = useSelector((state: RootState) => state.user?.friends);
  const _id = useSelector((state: RootState) => state.user?._id);
  const token = useSelector((state: RootState) => state.token);

  if (!friends || !_id) {
    return;
  }

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{ "&:hover": { color: light, cursor: "pointer" } }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: light, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: dark }} />
        ) : (
          <PersonAddAltOutlined sx={{ color: dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
