import { getSavedArray, changeSavedArray } from './utilityFunctions';
import { renderEditForm } from './renderEditForm';

const getItemIndex = (clickedItem, array) => {
    return Array.from(array).indexOf(clickedItem);
};

const addItemObject = value => {
    return {
        value: value,
        progress: 'In Progress'
    };
};

const hasOtherLiveEdits = () => {
    return !!document.querySelector('.form-edit');
};

export const handleAddingValueToStorage = buttonReference => {
    const componentReference = buttonReference.closest('article');
    const componentName = componentReference.dataset.name;
    const parentSection = buttonReference.closest('form');
    const input = parentSection.querySelector('input');
    const savedArray = getSavedArray(componentName);

    if (input.value) {
        const newArray = [...savedArray, addItemObject(input.value)];
        changeSavedArray(componentName, newArray);
    }
};

export const handleDeletingValueFromStorage = buttonReference => {
    const componentReference = buttonReference.closest('article');
    const componentName = componentReference.dataset.name;
    const savedArray = getSavedArray(componentName);
    const componentItems = componentReference.querySelectorAll(
        '.component__item'
    );
    const clickedItem = buttonReference.closest('li');

    const clickedItemIndex = getItemIndex(clickedItem, componentItems);
    const newArray = [...savedArray];
    newArray.splice(clickedItemIndex, 1);
    changeSavedArray(componentName, newArray);
};

export const handleCommittingItemChangesInStorage = buttonReference => {
    const componentReference = buttonReference.closest('article');
    const componentName = componentReference.dataset.name;
    const savedArray = getSavedArray(componentName);
    const parentSection = buttonReference.closest('form');
    const input = parentSection.querySelector('input');
    const componentItems = componentReference.querySelectorAll(
        '.component__item'
    );
    const clickedItem = buttonReference.closest('li');
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);

    if (input.value) {
        const newArray = [...savedArray];
        newArray[clickedItemIndex] = addItemObject(input.value);
        changeSavedArray(componentName, newArray);
    }
};

export const handleChangingItemValueInStorage = buttonReference => {
    if (!hasOtherLiveEdits()) {
        const parentItem = buttonReference.closest('li');
        parentItem.textContent = '';
        parentItem.insertAdjacentHTML('beforeend', renderEditForm());
    }
};

export const handleChangingProgressInStorage = (buttonReference, progress) => {
    const componentReference = buttonReference.closest('article');
    const componentName = componentReference.dataset.name;
    const savedArray = getSavedArray(componentName);
    const componentItems = componentReference.querySelectorAll(
        '.component__item'
    );
    const clickedItem = buttonReference.closest('li');
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);

    const newArray = [...savedArray];
    newArray[clickedItemIndex].progress = progress;
    changeSavedArray(componentName, newArray);
};

const createScheduleObject = (scheduleFormObject, description) => {
    return {
        ...scheduleFormObject,
        description: description
    };
};

export const handlePushingItemToScheduleStorage = (
    buttonReference,
    scheduleFormObject
) => {
    const parentElement = buttonReference.closest('form');
    const input = parentElement.querySelector(
        '.form-schedule__input_type_text'
    );

    if (input.value) {
        const savedArray = getSavedArray('schedule');
        const newArray = [
            ...savedArray,
            createScheduleObject(scheduleFormObject, input.value)
        ];
        changeSavedArray('schedule', newArray);
    }
};

export const handleDeletingItemFromScheduleStorage = buttonReference => {
    const savedArray = getSavedArray('schedule');
    const tableBody = buttonReference.closest('tbody');
    const tableRows = tableBody.querySelectorAll('tr');
    const clickedRow = buttonReference.closest('tr');
    const clickedRowIndex = getItemIndex(clickedRow, tableRows);
    const newArray = [...savedArray];
    newArray.splice(clickedRowIndex, 1);
    changeSavedArray('schedule', newArray);
};
