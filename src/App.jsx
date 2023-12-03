import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import UserProvider from "./contexts/user/UserProvider";
import { Toaster } from "react-hot-toast";
import Shuffle from "./pages/Shuffle/Shuffle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <UserProvider>
        <Shuffle />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
