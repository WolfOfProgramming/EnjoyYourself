import { getNumberOfSavedLists, getSavedListObject } from './utilityFunctions';
import { createListString } from './createListString';

export const renderLists = () => {
    let listsString = '';
    const numberOfSavedLists = getNumberOfSavedLists();

    for (let counter = 0; counter < numberOfSavedLists; counter++) {
        const savedListObject = getSavedListObject(counter);
        listsString += createListString(savedListObject, counter);
    }

    return listsString;
};
