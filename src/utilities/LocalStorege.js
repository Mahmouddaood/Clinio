import { AsyncStorage } from "react-native";

const isString = key => typeof key === "string";

export async function saveToStorage(key, value) {
  if (!key || !isString(key) || value === undefined) return;
  else await AsyncStorage.setItem(key, value);
}

export async function getFromStorage(key) {
  if (!key || !isString(key)) return;
  else return await AsyncStorage.getItem(key);
}

export const removeFromStorage = async key => {
  if (!key || !isString(key)) return;
  return await AsyncStorage.removeItem(key);
};
