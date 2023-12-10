import {
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
} from "@mui/icons-material";
import {
  FormControl,
  InputBase,
  Select,
  Typography,
  useTheme,
  IconButton,
  MenuItem,
} from "@mui/material";
import { setLogout, setMode } from "../../state/slices/authSlice";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";

const MenuItems = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const {
    neutral: { light: neutralLight, dark },
    mode,
  } = useTheme().palette;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      <IconButton onClick={() => dispatch(setMode())}>
        {mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard">
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "&. MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
export default MenuItems;
