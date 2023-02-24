import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  deleteData,
  setFormData,
  addData,
  editData,
  setFormDataError,
  setFormDataEdit,
} from "./HomeSlice";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  const { data, formData, formDataError, formDataEdit } = useSelector(
    (state) => state?.home
  );
  console.log("formDataError", formDataError);
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
    dispatch(setFormDataError({ ...formDataError, [name]: "" }));
  };

  const DeleteData = (id) => {
    dispatch(deleteData(id))
      .then((res) => {
        if (res?.payload?.id) {
          dispatch(getData());
        }
      })
      .catch((err) => console.log("err", err));
  };
  const validForm = () => {
    let Fromvlid = true;
    let formDataError = {};
    if (!formData?.fname?.trim()) {
      Fromvlid = false;
      formDataError["fname"] = "First name is required";
    }
    if (!formData?.lname?.trim()) {
      Fromvlid = false;
      formDataError["lname"] = "Last name is required";
    }
    dispatch(setFormDataError(formDataError));
    return Fromvlid;
  };

  const EditData = (item) => {
    dispatch(setFormDataEdit(true));
    dispatch(setFormData(item));
    // dispatch(editData())
  };
  console.log("formData?.id",formData?.id);
  const onEdit = () => {
    if (validForm()) {
      dispatch(editData(formData))
        .then((res) => {
          if (res?.payload?.id) {
            dispatch(getData());
            dispatch(setFormDataEdit(false));
            dispatch(setFormData({ fname: "", lname: "" }));
          }
        })
        .catch((err) => console.log("err", err));
    }
  };

  const onSubmit = () => {
    if (validForm()) {
      dispatch(addData(formData))
        .then((res) => {
          if (res?.payload?.id) {
            dispatch(getData());
            dispatch(setFormDataEdit(false));
            dispatch(setFormData({ fname: "", lname: "" }));
          }
        })
        .catch((err) => console.log("err", err));
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h1>Redux CRUD</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            "& > :not(style)": { mt: 2 },
          }}
        >
          <div style={{ textAlign: "left" }}>
            <span style={{ margin: "10px" }}>First Name</span>
            <TextField
              fullWidth
              id="outlined-required"
              // label="First Name"
              name="fname"
              value={formData?.fname}
              onChange={(e) => onChangeValue(e)}
            />
            <span style={{ fontSize: "14px", color: "red", margin: "10px" }}>
              {formDataError?.fname}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span style={{ margin: "10px" }}>Last Name</span>
            <TextField
              fullWidth
              id="outlined-required"
              // label="Last Name"
              name="lname"
              value={formData?.lname}
              onChange={(e) => onChangeValue(e)}
            />
            <span style={{ fontSize: "14px", color: "red", margin: "10px" }}>
              {formDataError?.lname}
            </span>
          </div>
          <Button
            sx={{ mb: 5 }}
            variant="contained"
            onClick={() => {
              formDataEdit ? onEdit() : onSubmit();
            }}
          >
            {formDataEdit ? "Edit" : "Submit"}
          </Button>
        </Box>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="table table-bordered"
          style={{ border: "1px solid black" }}
        >
          <thead>
            <tr>
              <th
                style={{ border: "1px solid black", width: "10px" }}
                scope="col"
              >
                ID
              </th>
              <th
                style={{ border: "1px solid black", width: "150px" }}
                scope="col"
              >
                First
              </th>
              <th
                style={{ border: "1px solid black", width: "150px" }}
                scope="col"
              >
                Last
              </th>
              <th
                style={{ border: "1px solid black", width: "150px" }}
                scope="col"
                colspan="2"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data?.map((item, index) => {
              return (
                <tr>
                  <th style={{ border: "1px solid black" }} scope="row">
                    {index + 1}
                  </th>
                  <td style={{ border: "1px solid black" }}>{item?.fname}</td>
                  <td style={{ border: "1px solid black" }}>{item?.lname}</td>
                  <td
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => EditData(item)}
                    >
                      Edit
                    </span>
                    <span
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => DeleteData(item?.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
