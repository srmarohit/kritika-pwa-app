import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSpeechSynthesis } from "react-speech-kit";

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
      "When you will answer the question correctly , then you will get the Gift Dairymilk "
    );
  }, []);

  useEffect(() => {
    sayRule();
  }, [words]);

  return (
    <div>
      <button onClick={sayRule}>listen more</button>
      <button onClick={() => navigate("/anstoquestion")}>
        Move the Question
      </button>
    </div>
  );
}

export default React.memo(Gift);
