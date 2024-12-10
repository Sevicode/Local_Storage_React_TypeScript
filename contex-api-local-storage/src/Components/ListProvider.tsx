import { useEffect, useState } from "react";
import { ListItem, ListProviderProps } from "../Interface/interface";
import { ListContext } from "../Context/ListContext";

export function ListProvider({ children }: ListProviderProps) {
  const [list, setList] = useState<ListItem[]>(() => {
    const savedList = localStorage.getItem("userList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(list));
  }, [list]);

  const addItem = (item: ListItem) =>
    setList((prevList) => [...prevList, item]);

  const removeItem = (index: number) =>
    setList((prevList) => prevList.filter((_, i) => i !== index));

  const clearList = () => setList([]);

  return (
    <ListContext.Provider value={{ list, addItem, removeItem, clearList }}>
      {children}
    </ListContext.Provider>
  );
}
