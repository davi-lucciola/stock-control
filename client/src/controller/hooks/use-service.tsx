import { useContext } from "react";
import { ServiceContext } from "../contexts/service-context";

export function useService() {
  return useContext(ServiceContext);
}
