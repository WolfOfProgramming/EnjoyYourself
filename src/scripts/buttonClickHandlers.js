import { getSavedArray, changeSavedArray } from './utilityFunctions';
import { renderEditForm } from './renderEditForm';

const inputSelector = 'input';
const formSelector = 'form';
const articleSelector = 'article';
const itemSelector = 'li';
const itemsClassSelector = '.component__item';
const editFormSelector = '.form-edit';

const scheduleInputSelector = '.form-schedule__input_type_text';
const tableBodySelector = 'tbody';
const tableRowSelector = 'tr';

const getItemIndex = (clickedItem, nodeList) => {
    return [...nodeList].indexOf(clickedItem);
};

const addItemObject = (value) => {
    return {
        value: value,
        status: 'In Progress'
    };
};

const hasOtherLiveEdits = () => {
    return !!document.querySelector(editFormSelector);
};

const getComponentRef = (buttonReference) => {
    return buttonReference.closest(articleSelector);
};

const getComponentName = (componentReference) => {
    return componentReference.dataset.name;
};

const getParentForm = (buttonReference) => {
    return buttonReference.closest(formSelector);
};

const getFormInput = (parentForm) => {
    return parentForm.querySelector(inputSelector);
};

const getComponentItems = (componentReference) => {
    return componentReference.querySelectorAll(itemsClassSelector);
};

const getClickedItem = (buttonReference) => {
    return buttonReference.closest(itemSelector);
};

export const handleAddingValueToStorage = (buttonReference) => {
    const componentReference = getComponentRef(buttonReference);
    const componentName = getComponentName(componentReference);
    const parentForm = getParentForm(buttonReference);
    const formInput = getFormInput(parentForm);
    const savedArray = getSavedArray(componentName);

    if (formInput.value) {
        const newArray = [...savedArray, addItemObject(formInput.value)];
        changeSavedArray(componentName, newArray);
    }
};

export const handleDeletingValueFromStorage = (buttonReference) => {
    const componentReference = getComponentRef(buttonReference);
    const componentName = getComponentName(componentReference);
    const savedArray = getSavedArray(componentName);
    const componentItems = getComponentItems(componentReference);
    const clickedItem = getClickedItem(buttonReference);
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);
    const newArray = [...savedArray];

    newArray.splice(clickedItemIndex, 1);
    changeSavedArray(componentName, newArray);
};

export const handleCommittingItemChangesInStorage = (buttonReference) => {
    const componentReference = getComponentRef(buttonReference);
    const componentName = getComponentName(componentReference);
    const savedArray = getSavedArray(componentName);
    const parentForm = getParentForm(buttonReference);
    const formInput = getFormInput(parentForm);
    const componentItems = getComponentItems(componentReference);
    const clickedItem = getClickedItem(buttonReference);
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);

    if (formInput.value) {
        const newArray = [...savedArray];
        newArray[clickedItemIndex] = addItemObject(formInput.value);
        changeSavedArray(componentName, newArray);
    }
};

export const handleChangingItemValueInStorage = (buttonReference) => {
    if (!hasOtherLiveEdits()) {
        const clickedItem = getClickedItem(buttonReference);
        clickedItem.textContent = '';
        clickedItem.insertAdjacentHTML('beforeend', renderEditForm());
    }
};

export const handleChangingStatusInStorage = (buttonReference, status) => {
    const componentReference = getComponentRef(buttonReference);
    const componentName = getComponentName(componentReference);
    const savedArray = getSavedArray(componentName);
    const componentItems = getComponentItems(componentReference);
    const clickedItem = getClickedItem(buttonReference);
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);
    const newArray = [...savedArray];

    newArray[clickedItemIndex].status = status;
    changeSavedArray(componentName, newArray);
};

const createScheduleObject = (scheduleFormObject, description) => {
    return {
        ...scheduleFormObject,
        description: description
    };
};

export const handlePushingItemToScheduleStorage = (buttonReference, scheduleFormObject) => {
    const parentForm = getParentForm(buttonReference);
    const formInput = parentForm.querySelector(scheduleInputSelector);

    if (formInput.value) {
        const savedArray = getSavedArray('schedule');
        const newArray = [...savedArray, createScheduleObject(scheduleFormObject, formInput.value)];
        changeSavedArray('schedule', newArray);
    }
};

export const handleDeletingItemFromScheduleStorage = (buttonReference) => {
    const savedArray = getSavedArray('schedule');
    const tableBody = buttonReference.closest(tableBodySelector);
    const tableRows = tableBody.querySelectorAll(tableRowSelector);
    const clickedRow = buttonReference.closest(tableRowSelector);
    const clickedRowIndex = getItemIndex(clickedRow, tableRows);
    const newArray = [...savedArray];

    newArray.splice(clickedRowIndex, 1);
    changeSavedArray('schedule', newArray);
};
