import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility functions for AsyncStorage operations
 */

export const STORAGE_KEYS = {
    TETHER_CODE: 'tether_code',
    TETHER_RELATIONSHIP: 'tether_relationship',
} as const;

/**
 * Store data in AsyncStorage
 */
export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error('Error storing data:', error);
        throw error;
    }
};

/**
 * Retrieve data from AsyncStorage
 */
export const getData = async (key: string): Promise<any | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

/**
 * Remove data from AsyncStorage
 */
export const removeData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }
};

/**
 * Clear all data from AsyncStorage
 */
export const clearAll = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing data:', error);
        throw error;
    }
};
