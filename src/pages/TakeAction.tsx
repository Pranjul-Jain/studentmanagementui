import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TakeAction = () => {
  const [data, setData] = useState<Record<string, any>>({});
  const role = useAppSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search);
    const id = queryParam.get("id");

    console.log(id, "number");
    if (id && role && Object.keys(data).length === 0) {
      const getData = async () => {
        const q = query(
          collection(db, "students"),
          where("number", "==", Number(id))
        );
        const result = await getDocs(q);
        console.log(result.docs);
        if (result.docs.length === 0) {
          navigate("/page404");
          return;
        }
        setData(result.docs[0].data());
      };
      getData();
    }
  }, [role]);

  return Object.keys(data).length !== 0 ? (
    <>
      <Grid padding={"1rem"} container spacing={2}>
        <Grid>
          <Typography variant="h6">Student Name:</Typography>
          <Typography variant="h5">{data.name}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">Father's Name:</Typography>
          <Typography variant="h5">{data.fatherName}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">Age:</Typography>
          <Typography variant="h5">{data.age}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">Gender:</Typography>
          <Typography variant="h5">{data.gender}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">Phone Number:</Typography>
          <Typography variant="h5">{data.number}</Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">Status:</Typography>
          <Typography variant="h5">{data.status}</Typography>
        </Grid>
      </Grid>
      {data.comment && (
        <Grid container spacing={2}>
          <Typography variant="h4">Comments:</Typography>
          <Typography maxWidth={"100%"} variant="h4">
            {data.comment}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        sx={{
          background: "white",
        }}
        padding={"1rem"}
        mt={2}
        spacing={2}
      >
        <TextField
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          fullWidth
          label="Comments"
          placeholder="Enter Comments"
        />
      </Grid>
      <Grid container mt={2} spacing={2}>
        <Grid
          display={"flex"}
          gap={"1rem"}
          justifyContent={"flex-end"}
          width={"100%"}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => updateStatus("approved")}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </Button>
        </Grid>
      </Grid>
    </>
  ) : (
    <Box>
      <CircularProgress />
    </Box>
  );

  async function updateStatus(status: string) {
    try {
      const q = query(
        collection(db, "students"),
        where("number", "==", data.number)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return;
      }

      snapshot.forEach(async (docSnap) => {
        await updateDoc(docSnap.ref, {
          status: status,
          comment,
          updatedAt: new Date(),
        });
      });

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }
};

export default TakeAction;
