import { useContext } from "react";
import { ListContext } from "../Components/ListContext";
import { ListContextType } from "../Interface/interface";

export function useList(): ListContextType {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
}
