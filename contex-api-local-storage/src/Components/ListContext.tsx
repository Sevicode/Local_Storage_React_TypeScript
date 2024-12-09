import { createContext, useContext, useEffect, useState } from "react";
import { ListContextType } from "../Interface/interface";

export const ListContext = createContext<ListContextType | undefined>(
  undefined
);
