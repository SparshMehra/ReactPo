import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import StyleModalContext from "./StyleModalContext";
import ChatbotBubble from "../chatbot/ChatbotBubble";
import { FaQuestion } from "react-icons/fa";
const actions = [
  { icon: <StyleModalContext />, name: "Accessibility" },
  { icon: <ChatbotBubble />, name: "chat bot" },
];

export default function BasicSpeedDial() {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 25, left: 100 }}
      icon={<FaQuestion />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
        />
      ))}
    </SpeedDial>
  );
}
