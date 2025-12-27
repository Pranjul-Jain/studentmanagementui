import { Box, Button, Typography } from "@mui/material";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<Record<string, any>>({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <Box
      display={"grid"}
      sx={{
        background: "#fff",
        color: "#000",
        borderRadius: "5px",
        padding: "1rem",
      }}
      alignItems={"start"}
      gap="0.5rem"
      width={"400px"}
      height={"300px"}
      margin={"auto"}
    >
      <Typography variant="h3">Login</Typography>
      <Button
        variant="contained"
        onClick={loginWithGoogle}
        sx={{
          width: "200px",
          justifySelf: "center",
        }}
        color="primary"
      >
        Login With Google
      </Button>
    </Box>
  );

  async function loginWithGoogle() {
    try {
      let userEmail = user.email || "";

      if (!user.email) {
        const result = await signInWithPopup(auth, googleProvider);

        const loginUser = result.user;
        userEmail = loginUser.email;
      }

      const q = query(collection(db, "users"), where("email", "==", userEmail));

      const docs = await getDocs(q);

      let role = "viewer";

      if (docs.docs.length !== 0) {
        console.log(docs.docs[0].data());
        role = docs.docs[0].data().role;
      }

      await dispatch(
        login({
          user: user.displayName,
          email: user.email,
          role: role || "viewer",
        })
      );
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }
};

export default Login;
