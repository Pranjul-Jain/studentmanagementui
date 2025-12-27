import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../features/auth/slice/AuthSlice";
import { signOut } from "firebase/auth";
import { auth as authContext } from "../../config/firebase";

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: React.ReactElement;
  roles?: string[];
}) => {
  const auth = useAppSelector((state) => state.auth);
  const [user, loading] = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!auth.email) {
        setIsAuthenticated(false);
        dispatch(logout());
      } else {
        if (roles && !roles.includes(auth.role)) {
          navigate("/page404");
        }
      }
    }
  }, [loading, auth, user]);

  const getChildren = () => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <Box
        display="flex"
        sx={{
          alignSelf: "start",
          justifyContent: "space-between",
          padding: "1rem",
          backgroundColor: "white",
          color: "black",
          mb: "2rem",
        }}
      >
        <Typography variant="h6">Student Management</Typography>
        <Button onClick={logoutUser} variant="contained" color="error">
          Logout
        </Button>
      </Box>
      {getChildren()}
    </Suspense>
  );

  async function logoutUser() {
    try {
      await signOut(authContext);
      dispatch(logout());
      navigate("/");
    } catch (error) {}
  }
};

export default ProtectedRoute;
