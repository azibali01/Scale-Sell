import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import RouterProvider from "./router/Router.tsx";
import ThemeProvider from "./theme/themeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  </StrictMode>
);
