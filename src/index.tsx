import * as React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import AddUserButton from "./addUserButton";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AddUserButton />
    </StyledEngineProvider>
  </React.StrictMode>
);
