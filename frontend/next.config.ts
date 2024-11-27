import type { NextConfig } from "next";
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {

  env: {
    API_KEY: process.env.GOOGLE_API_KEY, 
  },
};

export default nextConfig;
