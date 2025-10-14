import { IoVolumeHigh, IoVolumeOff } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

const Speaker = ({ content, additionalStyles = "" }) => {
  const [voices, setVoices] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthesisRef = useRef(null);
  const textRef = useRef("");

  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Handle text-to-speech
  const handleTextToSpeech = () => {
    if (speechSynthesisRef.current && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (speechSynthesisRef.current && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      textRef.current = `
        ${content}
      `;
      const utterance = new SpeechSynthesisUtterance(textRef.current);

      // Select a soft female voice
      const selectedVoice = voices.find(
        (voice) => voice.name.includes("Female") && voice.lang === "en-US"
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Adjust pitch and rate for a softer tone
      utterance.pitch = 1.4; // Slightly higher pitch
      utterance.rate = 0.9; // Slightly slower rate

      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        speechSynthesisRef.current = null;
        setIsPaused(false);
      };
    }
  };
  return (
    <>
      <button
        onClick={handleTextToSpeech}
        className={`ml-2 text-gray-900  dark:text-gray-100  focus:outline-none ${
          additionalStyles !== "" ? additionalStyles : ""
        }`}
      >
        {speechSynthesisRef.current && !isPaused ? (
          <IoVolumeOff className="text-3xl" />
        ) : (
          <IoVolumeHigh className="text-3xl" />
        )}
      </button>
    </>
  );
};

export default Speaker;
