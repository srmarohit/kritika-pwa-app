import {
  Alert,
  AlertTitle,
  Card,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import UploadFiles from "../components/UploadFiles";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useSpeechSynthesis } from "react-speech-kit";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { ctx } from "../context/contextAPI";

function Question() {
  const { name } = useContext(ctx);

  const [n1, setN1] = useState(1.25);
  const [n2, setN2] = useState(3.5);
  const [ans, setAns] = useState();
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();

  const { speak } = useSpeechSynthesis();

  const ansHandler = (e) => {
    setAns(Number(e.target.value));
  };

  const submitHandler = () => {
    let res = Number(n1) * Number(n2);
    console.log(res.toFixed(2));
    if (Math.floor(res) == Math.floor(Number(ans)) && res - Number(ans) < 0.2) {
      console.log(ans);
      setScore((score) => score + 1);
      setStatus("right");
      setN1((Math.random() * 100).toFixed(2));
      setN2((Math.random() * 100).toFixed(2));
      speak({
        text: ` Awesome ${name || "baby"} `,
      });
    } else {
      setStatus("wrong");
      speak({
        text: ` Your Bad  ${name || "baby"}`,
      });
    }

    setAns(0);
    setOpen(true);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    marginTop: "20px",
    width: "55%",
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  useEffect(() => {
    score > 4 &&
      setTimeout(() => {
        speak({
          text: ` Congratulation ${
            name || "baby"
          } ! If you loved this App. then  bring the Dairymilk for your teacher. `,
        });
      }, 2000);
  }, [score]);

  if (score > 4) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Card variant="outlined" style={{ padding: "20%" }}>
          <h1 style={{ color: "green" }}>Congrats! </h1>
          <p style={{ marginBottom: "20px", fontWeight: 600 }}>
            You cracked the Quiz !
          </p>
          <Link
            to="/"
            style={{
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              textDecoration: "none",
            }}
          >
            Restart
          </Link>
        </Card>
      </Box>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity={status == "right" ? "success" : "error"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 4 }}
        >
          <AlertTitle>
            {status == "right" ? "Very Good ! " : "Sorry !"}
          </AlertTitle>
          {status == "right"
            ? " your Score is " + score
            : "  You are wrong ! Score still is " + score}
        </Alert>
      </Collapse>
      <TextField disabled id="outlined-disabled" label="Number" value={n1} />
      <h1> * </h1>
      <TextField disabled id="outlined-disabled" label="Number" value={n2} />
      <h1> = </h1>
      <TextField
        id="outlined-disabled"
        label="Answer"
        value={ans}
        onChange={ansHandler}
        type="number"
      />
      <ColorButton variant="contained" onClick={submitHandler}>
        Submit
      </ColorButton>
    </div>
  );
}

export default Question;
