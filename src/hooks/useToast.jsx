import { useContext, createContext } from "react";

export const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}