import { compare } from './createListContent';

export const changeSavedListObject = (listName, newListObject) => {
    newListObject.items = newListObject.items.sort(compare);
    localStorage.setItem(listName, JSON.stringify(newListObject));
};

export const getNumberOfSavedLists = () => {
    return localStorage.getItem('numberOfSavedLists') || 0;
};

export const getSavedListObject = (listName) => {
    return JSON.parse(localStorage.getItem(listName));
};

export const deleteSavedListObject = (listName) => {
    localStorage.removeItem(listName);
};

export const setNumberOfSavedLists = (numberOfSavedLists) => {
    return localStorage.setItem('numberOfSavedLists', numberOfSavedLists);
};

export const createListObject = (listName) => {
    return {
        name: listName,
        items: []
    };
};

export const addListObjectToLocalStorage = (listName, listObject) => {
    localStorage.setItem(listName, JSON.stringify(listObject));
};

export const resetElementContent = (element) => {
    element.textContent = '';
};

export const qs = (selector) => document.querySelector(selector);
