import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSpeechSynthesis } from "react-speech-kit";
import SendIcon from "@mui/icons-material/Send";

function Gift() {
  const [words, setWords] = useState("");

  const { speak } = useSpeechSynthesis();

  const navigate = useNavigate();

  const sayRule = () => {
    speak({
      text: words,
    });
  };

  useEffect(() => {
    console.log("dd");
    setWords(
      "When you will answer the question .. correctly . then you will get .. the Gift .. Dairymilk "
    );
  }, []);

  useEffect(() => {
    sayRule();
  }, [words]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <button onClick={sayRule}>listen more</button> */}
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => navigate("/anstoquestion")}
      >
        Move the Question
      </Button>
    </div>
  );
}

export default React.memo(Gift);
