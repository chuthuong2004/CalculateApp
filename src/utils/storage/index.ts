import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};
export const save = async <T>(key: string, value: T) =>
  saveString(key, JSON.stringify(value));

export const getString = async (key: string): Promise<null | string> => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return itemString;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const get = async <T>(key: string): Promise<T | null> => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString && itemString.length > 0) {
      return JSON.parse(itemString) as T;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const remove = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  saveString,
  save,
  get,
  remove,
};
