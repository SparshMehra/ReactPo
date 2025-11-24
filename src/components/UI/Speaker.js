/**
 * Speaker Component (Text-to-Speech)
 *
 * @file Speaker.js
 * @author Abdiaziz Muse (A00471783) - Accessibility, UI revamp, cleanup
 * @description Accessible text-to-speech control button used across pages.
 */
import { IoVolumeHigh, IoVolumeOff } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

const Speaker = ({ content, additionalStyles = "" }) => {
  const [voices, setVoices] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);
  const textRef = useRef("");
  const [isPressed, setIsPressed] = useState(false);

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
    // If something is currently speaking and not paused, pause it
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    // If something is paused, resume it
    if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Otherwise start a new utterance (cancel any queued/playing utterances first)
    textRef.current = `${content}`;
    const utterance = new SpeechSynthesisUtterance(textRef.current);

    // Select a soft female voice if available
    const selectedVoice = voices.find(
      (voice) => voice.name.includes("Female") && voice.lang === "en-US"
    );
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.pitch = 1.4;
    utterance.rate = 0.9;

    // Cancel any global speech to ensure we can start fresh
    try {
      window.speechSynthesis.cancel();
    } catch (err) {
      // ignore
    }

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPaused(false);

    utterance.onend = () => {
      utteranceRef.current = null;
      setIsPaused(false);
    };
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
        utteranceRef.current = null;
      }
    };
  }, []);
  return (
    <>
      <button
        type="button"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
        onClick={e => {
          handleTextToSpeech();
          setIsPressed(false);
        }}
        className={`ml-2 text-gray-900 dark:text-gray-100 focus:outline-none transform transition duration-150 ${
          isPressed ? "scale-95 opacity-80" : "hover:scale-105"
        } ${additionalStyles !== "" ? additionalStyles : ""}`}
      >
        {isPressed ? (
          <IoVolumeHigh className="text-3xl" />
        ) : utteranceRef.current && !isPaused ? (
          <IoVolumeOff className="text-3xl" />
        ) : (
          <IoVolumeHigh className="text-3xl" />
        )}
      </button>
    </>
  );
};

export default Speaker;
