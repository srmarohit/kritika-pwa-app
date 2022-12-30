import { useEffect, useState } from "react";
import AnsweringGreet from "../components/AnsweringGreet";
import Greet from "../components/Greet";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";

export default function () {
  const [askTime, setAskTime] = useState(0);
  const [words, setWords] = useState("");
  const [systemMic, setSystemMic] = useState(false);

  const { speak } = useSpeechSynthesis();

  const navigate = useNavigate();

  console.log(askTime);

  useEffect(() => {
    setWords("Hello Rohit, How are you ?");
  }, []);

  useEffect(() => {
    if (!systemMic) {
      console.log("ff");
      speak({
        text: askTime > 1 ? "No problem ! move to the game !" : words,
      });
      setTimeout(() => {
        if (askTime > 1 || askTime == -1) {
          navigate("/gift");
        } else {
          setSystemMic(true);
        }
      }, 5000);
    }
  }, [words, systemMic]);

  return (
    <div>
      {systemMic && (
        <AnsweringGreet
          askTime={askTime}
          setAskTime={setAskTime}
          setWords={setWords}
          setSystemMic={setSystemMic}
        />
      )}
    </div>
  );
}
