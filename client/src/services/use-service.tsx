import { useContext } from "react";
import { ServiceContext } from "./service-provider";

export function useService() {
  return useContext(ServiceContext);
}
