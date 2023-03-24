import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import * as serverService from "@/services/serverService";
import { CourseData } from "@/models/course.model";
import { RootState, store } from "../store";
import { NextRouter } from "next/router";

interface CourseState {
  courses: CourseData[];
}

const initialState: CourseState = {
  courses: [],
};

export const getCourse = createAsyncThunk(
  "course/get",
  async (keyword?: string) => {
    return await serverService.getCourse(keyword);
  }
);

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id: string) => {
    await serverService.deleteCourse(id);
    store.dispatch(getCourse());
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.courses = action.payload;
    });
  },
});

// export common user selector
export const courseSelector = (store: RootState): CourseData[] | undefined =>
  store.course.courses;
  
// export reducer
export default courseSlice.reducer;
