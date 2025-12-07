import type { Config } from "tailwindcss";
import sharedConfig from "@repo/config/src/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;

