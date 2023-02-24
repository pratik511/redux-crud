import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";
import axios from "axios";

const initialState = {
  value: 0,
  data: [],
  formData: {},
  formDataError: {},
  formDataEdit: false,
  error: null,
};
export const getData = createAsyncThunk("/getData", async () => {
  try {
    const response = await axios.get(`${BASE_URL}rtest`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const addData = createAsyncThunk("/postData", async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}rtest`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const editData = createAsyncThunk("/putData", async (body) => {
  try {
    const response = await axios.put(`${BASE_URL}rtest/${body?.id}`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const deleteData = createAsyncThunk("/deleteData", async (body) => {
  try {
    const response = await axios.delete(`${BASE_URL}rtest/${body}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const HomeSlice = createSlice({
  name: "home",
  initialState,
  activeJourney: null,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setFormDataError: (state, action) => {
      state.formDataError = action.payload;
    },
    setFormDataEdit: (state, action) => {
      state.formDataEdit = action.payload;
    },
  },
  extraReducers(homeData) {
    homeData
      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getData.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFormData, setFormDataError, setFormDataEdit } = HomeSlice.actions;

export default HomeSlice.reducer;
