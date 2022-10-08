import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api`
      : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api`,
});
