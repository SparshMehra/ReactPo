/**
 * PlaygroundSpeedDial Component
 *
 * @file PlaygroundSpeedDial.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, accessibility, integrations
 * @author Bhabin Chudal (A00464169) - UI improvements, cleanup
 * @description Floating Speed Dial for quick actions like Accessibility panel and Chatbot.
 */
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import ChatbotWindow from "../chatbot/ChatbotWindow";
import Modal2 from "./Modal2";
import TextAdjustment from "./TextAdjustment";
import Pagination from "./Pagination";
import Box from "./Box";
import { FaQuestion, FaComments } from "react-icons/fa";
import { RxAccessibility } from "react-icons/rx";
import { MdOutlineTextIncrease } from "react-icons/md";
import { CiLineHeight } from "react-icons/ci";

const FixedSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 9999,
}));

export default function PlaygroundSpeedDial() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  
  // Load saved preferences from localStorage on mount
  const [lineHeightTracker, setLineHeightTracker] = useState(() => {
    const saved = localStorage.getItem("lineHeightPreference");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [fontTracker, setFontTracker] = useState(() => {
    const saved = localStorage.getItem("textSizePreference");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Apply saved preferences on component mount
  React.useEffect(() => {
    const textSizeClasses = ["bodyTextxlg", "bodyTextxxlg"];
    const lineHeightClasses = ["lineHeightBigger", "lineHeightBiggest"];
    
    // Remove all classes first
    document.body.classList.remove(...textSizeClasses, ...lineHeightClasses);
    
    // Apply saved text size
    if (fontTracker === 1 || fontTracker === 2) {
      document.body.classList.add(textSizeClasses[fontTracker - 1]);
    }
    
    // Apply saved line height
    if (lineHeightTracker === 1 || lineHeightTracker === 2) {
      document.body.classList.add(lineHeightClasses[lineHeightTracker - 1]);
    }
  }, []);

  const handleChatbotToggle = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleAccessibilityToggle = () => {
    setIsAccessibilityOpen(!isAccessibilityOpen);
  };

  const actions = [
    {
      icon: <RxAccessibility style={{ fontSize: '24px' }} />,
      name: "Accessibility",
      onClick: handleAccessibilityToggle
    },
    {
      icon: <FaComments style={{ fontSize: '24px' }} />,
      name: "Chatbot",
      onClick: handleChatbotToggle
    },
  ];

  return (
    <>
      <FixedSpeedDial
        ariaLabel="Quick Actions Speed Dial"
        icon={<FaQuestion style={{ fontSize: '20px' }} />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            aria-label={action.name}
            onClick={action.onClick}
          />
        ))}
      </FixedSpeedDial>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          zIndex: 10000
        }}>
          <ChatbotWindow onClose={handleChatbotToggle} />
        </div>
      )}

      {/* Accessibility Panel */}
      {isAccessibilityOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          zIndex: 10000,
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          padding: '24px',
          minWidth: '320px'
        }}>
          <button
            onClick={handleAccessibilityToggle}
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              lineHeight: 1,
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
            aria-label="Close accessibility panel"
          >
            ×
          </button>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Accessibility Options
          </h3>
          <TextAdjustment>
            <MdOutlineTextIncrease className="secondaryHeading" />
            <Pagination 
              tracker={fontTracker} 
              setTracker={setFontTracker}
              storageKey="textSizePreference"
            />
          </TextAdjustment>
          <TextAdjustment>
            <CiLineHeight className="secondaryHeading" />
            <Pagination
              classes={["lineHeightBigger", "lineHeightBiggest"]}
              tracker={lineHeightTracker}
              setTracker={setLineHeightTracker}
              storageKey="lineHeightPreference"
            />
          </TextAdjustment>
        </div>
      )}
    </>
  );
}
