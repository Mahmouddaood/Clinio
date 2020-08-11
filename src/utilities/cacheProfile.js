import {
  getFromStorage,
  saveToStorage,
  removeFromStorage
} from "./LocalStorege";

export async function cashProfile(profile) {
  await saveToStorage("currentUser", JSON.stringify(profile));
}

export async function getDataFormCachedProfile(item) {
  const data = await getFromStorage("currentUser");
  if (Boolean(data)) {
    const parsedData = await JSON.parse(data);
    if (item && typeof item === "string") {
      return await parsedData[item];
    } else {
      return await parsedData;
    }
  } else return await false;
}

export async function removeCachedProfile() {
  await removeFromStorage("currentUser");
}
