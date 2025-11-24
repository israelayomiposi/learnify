import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";

const clerkPublishableKey = "pk_test_bGVnYWwtc2VhaG9yc2UtMzUuY2xlcmsuYWNjb3VudHMuZGV2JA"; // <-- paste your key here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
