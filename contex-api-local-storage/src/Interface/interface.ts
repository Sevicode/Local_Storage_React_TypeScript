import { ReactNode } from "react";

export interface ListItem {
  name: string;
  email: string;
  username: string;
}

export interface ListContextType {
  list: ListItem[];
  addItem: (item: ListItem) => void;
  removeItem: (index: number) => void;
  clearList: () => void;
}

export interface ListProviderProps {
  children: ReactNode;
}
