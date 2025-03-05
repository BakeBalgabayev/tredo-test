const FORM_STORAGE_KEY = 'creditApplicationForm';

export const formStorage = {
    save: (step: string, data: Record<string, any>) => {
        const savedData = formStorage.load() || {};
        savedData[step] = data;
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(savedData));
    },
    load: (): Record<string, any> => {
        const data = localStorage.getItem(FORM_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },
};