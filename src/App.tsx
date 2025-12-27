import { Box } from "@mui/material";
import "./App.css";
import { AppProvider } from "./providers/app";
import Routes from "./providers/Routes";

function App() {
  return (
    <Box display={"grid"} className="App">
      <AppProvider>
        <Routes />
      </AppProvider>
    </Box>
  );
}

export default App;
