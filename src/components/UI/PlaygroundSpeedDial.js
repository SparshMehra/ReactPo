import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { styled } from "@mui/material/styles";
import * as React from "react";
import ChatbotBubble from "../chatbot/ChatbotBubble";
import StyleModalContext from "./StyleModalContext";
import { FaQuestion } from "react-icons/fa";

const FixedSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(3),
  zIndex: 9999,
}));

const actions = [
  { icon: <StyleModalContext />, name: "Accessibility" },
  { icon: <ChatbotBubble />, name: "Chat bot" },
];

export default function PlaygroundSpeedDial() {
  return (
    <FixedSpeedDial
      ariaLabel="Fixed Speed Dial"
      icon={<FaQuestion />}
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} />
      ))}
    </FixedSpeedDial>
  );
}
