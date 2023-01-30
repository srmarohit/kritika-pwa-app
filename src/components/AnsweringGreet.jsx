import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

let negativeVoice = [
  "not good",
  "not bad",
  "not fine",
  "poor",
  "sick",
  "angry",
];

let positiveVoice = ["good", "fine", "awesome", "cool", "hot", "better"];

export default function AnsweringGreet({
  setWords,
  askTime,
  setAskTime,
  setSystemMic,
}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Mic not working..</span>;
  }

  if (transcript && !listening) {
    console.log("transript..");

    let found = false;

    for (let voice of negativeVoice) {
      if (transcript.toString().toLowerCase().match(voice)) {
        resetTranscript();
        setWords("ohh Sorry but no problem . lets play the game !");
        setAskTime(-1);
        setSystemMic(false);
        found = true;
        break;
      }
    }

    if (!found) {
      for (let voice of positiveVoice) {
        if (transcript.toString().toLowerCase().match(voice)) {
          resetTranscript();
          setWords("Great ! lets play the game !");
          setAskTime(-1);
          setSystemMic(false);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      console.log("not found");
      resetTranscript();
      setWords("I am sorry ! Could not hear you . ? ");
      setAskTime(askTime + 1);
      setSystemMic(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "10%",
      }}
    >
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <img
        src="https://media.tenor.com/w63dY06lsp8AAAAi/mic.gif"
        onClick={SpeechRecognition.startListening}
      />
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> 
      <p>{transcript}</p>*/}
    </div>
  );
}
