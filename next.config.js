/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(`isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`);

  const env = {
    VERSION: (() => {
      if (isDev) return "1.0.0";
      if (isProd) return "1.0.0";
      if (isStaging) return "1.0.0";
      return "VERSION:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
    API_URL: (() => {
      if (isDev) return "https://economax.onrender.com";
      if (isProd) return "https://economax.onrender.com";
      if (isStaging) return "https://economax.onrender.com";
      return "API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
  };

  return {
    env,
  };
};
