import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  return <Suspense fallback={<CircularProgress />}>{children}</Suspense>;
};

export default PublicRoute;
