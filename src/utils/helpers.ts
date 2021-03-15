import { v4 as uuid } from "uuid";

export const shuffleDeck = <T>(list: T[]) => {
  const newList: T[] = [...list];
  for (let currentIndex = list.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [newList[currentIndex], newList[randomIndex]] = [
      newList[randomIndex],
      newList[currentIndex],
    ];
  }
  return newList;
};

export const generateId = () => {
  return uuid();
};
