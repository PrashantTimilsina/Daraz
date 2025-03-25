import { createContext } from "react";

const userContext = createContext();
function UserProvider({ children }) {
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState("");
}
