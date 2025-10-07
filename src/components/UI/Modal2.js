import React, {
  cloneElement,
  createContext,
  useState,
  useContext,
} from "react";
let ModalContext = createContext();

export default function Modal2({ children }) {
  const [open, setOpen] = useState("form"); // ""- false, and "name"=true

  let openFunc = (name) => setOpen(name);
  let closeFunc = () => setOpen("");
  return (
    <ModalContext.Provider value={{ openFunc, closeFunc, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  let { openFunc } = useContext(ModalContext);
  return <>{cloneElement(children, { onClick: () => openFunc(name) })}</>;
}

function Window({ children, name }) {
  const { open } = useContext(ModalContext);

  if (open == "") return;
  return <StyledWindow>{children}</StyledWindow>;
}

function CloseIcon({ className }) {
  const { closeFunc } = useContext(ModalContext);
  return (
    <div onClick={closeFunc} className={className}>
      X
    </div>
  );
}

function StyledWindow({ children }) {
  return (
    <div className="shadow-black-800/60 fixed right-[5%] bottom-[5%] rounded-xl bg-stone-300 p-3 shadow-lg">
      <CloseIcon className="text-right"></CloseIcon>
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
