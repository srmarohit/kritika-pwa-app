import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";

function Greet({ words, setSystemMic }) {
  const { speak } = useSpeechSynthesis();
  const navigate = useNavigate();

  const sayGreet = () => {
    console.log("dd", words);
    speak({
      text: words,
    });
    // setSystemMic(true);
  };

  useEffect(() => {
    sayGreet();
  }, [words]);

  //sayGreet();

  return <div>Greet </div>;
}

export default React.memo(Greet);
