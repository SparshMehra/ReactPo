/**
 * Speaker.js
 * @author S M Riyad Farhan (A00470224)
 * Text-to-Speech Speaker Component file
 * 
 * @description A React component that provides text-to-speech functionality
 * Using the Web Speech API. It allows users to listen to the provided
 * Text content with play/pause controls and visual feedback.
 * 
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
    // Normalize content to a stable key for global comparisons
    const contentKey = (content || "").replace(/\s+/g, " ").trim();
    // If something is currently speaking and not paused
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      // If the currently-playing utterance belongs to this Speaker instance, pause it
      if (
        window.__speaker_currentUtteranceId &&
        utteranceRef.current &&
        window.__speaker_currentUtteranceId === utteranceRef.current._speakerId
      ) {
        window.speechSynthesis.pause();
        setIsPaused(true);
        return;
      }
      // Otherwise cancel current speech so we can start this speaker's content
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    // If something is paused
    if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
      // If the paused utterance belongs to this Speaker instance, resume it
      if (
        window.__speaker_currentUtteranceId &&
        utteranceRef.current &&
        window.__speaker_currentUtteranceId === utteranceRef.current._speakerId
      ) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        return;
      }
      // Otherwise cancel paused speech and continue to start this speaker's content
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    // Start a new utterance (any previous speech has been cancelled above)
    textRef.current = `${content}`;
    const utterance = new SpeechSynthesisUtterance(textRef.current);

    // Select a soft female voice if available
    const selectedVoice = voices.find(
      (voice) => voice.name.includes("Female") && voice.lang === "en-US"
    );
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.pitch = 1.4;
    utterance.rate = 0.9;

    // Register this utterance as the global current utterance/content (use normalized key)
    const utteranceId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    utterance._speakerId = utteranceId;
    window.__speaker_currentUtteranceId = utteranceId;
    window.__speaker_currentText = contentKey;
    window.__speaker_currentUtterance = utterance;

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPaused(false);

    utterance.onend = () => {
      // Clear global marker if it still points to this utterance
      if (window.__speaker_currentUtterance === utterance) {
        window.__speaker_currentUtterance = null;
        window.__speaker_currentUtteranceId = null;
        window.__speaker_currentText = null;
      }
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
