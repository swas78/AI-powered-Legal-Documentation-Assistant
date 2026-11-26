import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@nyay_saathi_drafts_v1';

export const saveDraft = async (templateId, formData) => {
  try {
    const existing = await getDrafts();
    const updated = {
      ...existing,
      [templateId]: {
        templateId,
        formData,
        updatedAt: new Date().toISOString(),
      },
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving draft:', error);
    return false;
  }
};

export const getDrafts = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : {};
  } catch (error) {
    console.error('Error loading drafts:', error);
    return {};
  }
};

export const getDraftById = async (templateId) => {
  try {
    const drafts = await getDrafts();
    return drafts[templateId] || null;
  } catch (error) {
    console.error('Error getting draft:', error);
    return null;
  }
};

export const removeDraft = async (templateId) => {
  try {
    const drafts = await getDrafts();
    delete drafts[templateId];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('Error removing draft:', error);
    return false;
  }
};
