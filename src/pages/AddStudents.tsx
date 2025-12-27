import { Button, Grid } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import FormikCustomTextField from "../components/FormikCustomTextField";
import FormikCustomSelectField from "../components/FormikCustomSelectField";
import { useNavigate } from "react-router-dom";

const AddStudents = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      comment: "",
      number: "",
      fathersName: "",
      status: "pending",
      updatedAt: new Date(),
    },
    onSubmit: async (values) => {
      const q = query(
        collection(db, "students"),
        where("email", "==", values.number)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "students"), values);
        navigate("/home");
      } else {
        alert("User Already Exists With Same Phone Number");
      }
    },
  });

  return (
    <form
      style={{ backgroundColor: "white", color: "black", padding: "1rem" }}
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid>
          <FormikCustomTextField
            name="name"
            id="name"
            title="Student Name"
            formik={formik}
            type="text"
            placeholder="Enter Student Name"
          />
        </Grid>
        <Grid>
          <FormikCustomTextField
            name="fatherName"
            id="name"
            title="Father's Name"
            formik={formik}
            type="text"
            placeholder="Enter Father's Name"
          />
        </Grid>
        <Grid>
          <FormikCustomTextField
            name="age"
            id="age"
            title="Age"
            formik={formik}
            type="number"
            placeholder="Enter Age"
          />
        </Grid>
        <Grid>
          <FormikCustomSelectField
            name="gender"
            id="gender"
            title="Gender"
            formik={formik}
            menuDict={{
              male: "Male",
              female: "Female",
            }}
          />
        </Grid>
        <Grid>
          <FormikCustomTextField
            name="number"
            id="mobile"
            title="Phone Number"
            formik={formik}
            type="number"
            placeholder="Enter Number"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          display={"flex"}
          mt={2}
          width={"100%"}
          justifyContent={"flex-end"}
        >
          <Button
            sx={{ marginRight: "1rem" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddStudents;
