import React, {
  cloneElement,
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { MdOutlineClose } from "react-icons/md";

let ModalContext = createContext();

export default function Modal2({ children }) {
  const [open, setOpen] = useState(""); // ""- false, and "name"=true

  let openFunc = (name) => setOpen(name);
  let closeFunc = () => setOpen("");
  return (
    <ModalContext.Provider value={{ openFunc, closeFunc, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name, className = "" }) {
  let { openFunc, closeFunc, open } = useContext(ModalContext);
  return (
    <>
      {cloneElement(
        children,
        {
          onClick: () => {
            open ? closeFunc() : openFunc(name);
          },
        },
        { children: `${children.props.className || ""}` }
      )}
    </>
  );
}

function Window({ children, name }) {
  const { open, closeFunc } = useContext(ModalContext);
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click detected outside");
        closeFunc();
      }
    }
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [closeFunc]);

  if (open === "") return;
  return <StyledWindow reference={ref}>{children}</StyledWindow>;
}

function CloseIcon({ className }) {
  const { closeFunc } = useContext(ModalContext);
  return (
    <div className="  flex justify-end py-2 px-0  rounded-b-full  mb-6">
      <MdOutlineClose
        size={30}
        fill="white"
        onClick={closeFunc}
        className=" mr-1 ring-1 ring-cyan-400 ring-offset-2 rounded-full"
      />
    </div>
  );
}

function StyledWindow({ children, reference }) {
  return (
    <div
      ref={reference}
      className="  absolute bottom-[3rem] left-[-2rem] z-[99999] shadow-black-800/60  rounded-xl bg-stone-300 p-3 shadow-lg"
    >
      <CloseIcon></CloseIcon>
      {children}
    </div>
  );
}

Modal2.Open = Open;
Modal2.Window = Window;

// Modal
//     Modal.Open open= createForm -> Opens up the Modal Window
//         <Button> -> think this as general button so that clicking functionality won't take it anywhere.
//     Modal.Window close=createForm-> only display if open==true
//         <Content you want to be in modal window>
