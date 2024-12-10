import { createContext } from "react";
import { ListContextType } from "../Interface/interface";

export const ListContext = createContext<ListContextType | undefined>(
  undefined
);
