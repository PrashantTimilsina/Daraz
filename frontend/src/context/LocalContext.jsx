import { createContext, useContext, useState } from "react";

const localContext = createContext();
function LocalProvider({ children }) {
  const [clicked, setClicked] = useState("");
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const [buttonText, setButtonText] = useState(false);
  return (
    <localContext.Provider
      value={{
        clicked,
        setClicked,
        text,
        setText,
        isVisible,
        setIsVisible,
        delivery,
        setDelivery,
        buttonText,
        setButtonText,
      }}
    >
      {children}
    </localContext.Provider>
  );
}
function useLocal() {
  const context = useContext(localContext);
  return context;
}
export { LocalProvider, useLocal };
