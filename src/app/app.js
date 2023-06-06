import { useEffect } from "react";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.log("Falha ao registrar o Service Worker:", error);
        });
    });
  }
};

function App({ Component, pageProps }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return <Component {...pageProps} />;
}

export default App;
