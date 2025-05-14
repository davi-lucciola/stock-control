import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { toast } from "react-toastify";
import { HttpError, HttpWarning } from "./http";

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    validateStatus: (status: number) => {
      return status < 400;
    },
  })
);

export const httpErrorHandler = (error: unknown) => {
  if (error instanceof HttpWarning) {
    toast.warn(error.message);
  } else if (error instanceof HttpError) {
    toast.error(error.message);
  } else {
    toast.error("Houve um erro ao realizar sua solicitação.");
  }
};
