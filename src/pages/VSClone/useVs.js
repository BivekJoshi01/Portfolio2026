import { useContext } from "react";
import { VsContext } from "./vsContext";

export const useVs = () => {
  const ctx = useContext(VsContext);
  if (!ctx) throw new Error("useVs must be used inside VsProvider");
  return ctx;
};
