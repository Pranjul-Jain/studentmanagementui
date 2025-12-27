import { CircularProgress } from "@mui/material";
import React from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense
      fallback={
        <div className="w-100 h-100 d-flex justfy-content-center align-items-center">
          <CircularProgress size="xl" />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
};
