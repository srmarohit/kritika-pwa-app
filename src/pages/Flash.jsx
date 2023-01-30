import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import LinearProgress from "@mui/material/LinearProgress";
import { Container } from "@mui/system";

function Flash() {
  const [progress, setProgress] = React.useState(20);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 20);
    }, 800);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100vh",
      }}
    >
      {progress > 100 ? (
        <Navigate to="/home" replace={true} />
      ) : (
        <>
          <LinearProgress />
          <div style={{ marginTop: "30%", textAlign: "center" }}>
            <span style={{ color: "#ccc" }}>Developed By </span>
            <h1>Rohit Sharma</h1>
          </div>
        </>
      )}
    </Container>
  );
}

export default Flash;
