import { precacheAndRoute } from "workbox-precaching";

// Cache os arquivos estáticos durante a instalação do Service Worker
precacheAndRoute(self.__WB_MANIFEST);
