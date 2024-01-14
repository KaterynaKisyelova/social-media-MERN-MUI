import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, User } from "../../types";
import { PaletteMode } from "@mui/material";

type InitialState = {
  mode: PaletteMode;
  user: User | null;
  token: string;
  posts: Post[];
};

const initialState: InitialState = {
  mode: "light",
  user: null,
  token: "",
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (
      state,
      { payload }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = "";
    },
    setFriends: (state, { payload }: PayloadAction<{ friends: string[] }>) => {
      if (state.user) {
        state.user.friends = payload.friends;
      } else {
        console.log("user friends non-existent");
      }
    },
    setPosts: (state, { payload }: PayloadAction<{ posts: Post[] }>) => {
      state.posts = payload.posts;
    },
    setPost: (state, { payload }: PayloadAction<{ post: Post }>) => {
      state.posts = state.posts.map((post) =>
        post._id === payload.post._id ? payload.post : post
      );
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
