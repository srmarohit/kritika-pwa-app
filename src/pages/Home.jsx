import { useContext, useEffect, useState } from "react";
import AnsweringGreet from "../components/AnsweringGreet";
import Greet from "../components/Greet";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import { ctx } from "../context/contextAPI";

export default function () {
  const [askTime, setAskTime] = useState(0);
  const [words, setWords] = useState("");
  const [systemMic, setSystemMic] = useState(false);

  const { speak } = useSpeechSynthesis();

  const navigate = useNavigate();

  const { name } = useContext(ctx);

  console.log(askTime);

  useEffect(() => {
    setWords(`Hello ${name || "There"}, How are you ?`);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {systemMic ? (
        <AnsweringGreet
          askTime={askTime}
          setAskTime={setAskTime}
          setWords={setWords}
          setSystemMic={setSystemMic}
        />
      ) : (
        <img
          src="https://media.tenor.com/JqjtUxrkuzsAAAAj/robot-dance.gif"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
