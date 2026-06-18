import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  settings: "elevate-horizon/settings",
  registrations: "elevate-horizon/registrations",
};

export async function readJson(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

export async function writeJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
