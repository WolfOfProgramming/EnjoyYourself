import {
    getSavedListObject,
    changeSavedListObject,
    getNumberOfSavedLists,
    setNumberOfSavedLists,
    deleteSavedListObject
} from './utilityFunctions';
import { renderEditForm } from './renderEditForm';

const inputSelector = 'input';
const formSelector = 'form';
const articleSelector = 'article';
const itemSelector = 'li';
const itemsClassSelector = '.component__item';
const editFormSelector = '.form-edit';
const progressContainerSelector = '.progress-container';
const progressContainerTextSelector = '.progress-container__progression-text';
const progressBarSelector = '.progress-bar';
const doneItemSelector = '.button_type_done.button_active';

const getItemIndex = (clickedItem, nodeList) => {
    return [...nodeList].indexOf(clickedItem);
};

const addItemObject = (value) => {
    return {
        value: value,
        status: 'in_progress'
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
    const parentForm = getParentForm(buttonReference);
    const formInput = getFormInput(parentForm);
    const formInputValue = formInput.value;

    if (formInputValue) {
        const componentReference = getComponentRef(buttonReference);
        const componentName = getComponentName(componentReference);
        const savedListObject = getSavedListObject(componentName);

        const newListObject = {
            name: savedListObject.name,
            items: [...savedListObject.items, addItemObject(formInputValue)]
        };

        changeSavedListObject(componentName, newListObject);
    }
};

export const handleDeletingValueFromStorage = (buttonReference) => {
    const componentReference = getComponentRef(buttonReference);
    const componentName = getComponentName(componentReference);
    const componentItems = getComponentItems(componentReference);
    const clickedItem = getClickedItem(buttonReference);
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);

    const savedListObject = getSavedListObject(componentName);
    const newListObjectArray = savedListObject.items;
    newListObjectArray.splice(clickedItemIndex, 1);

    const newListObject = {
        name: savedListObject.name,
        items: [...newListObjectArray]
    };

    changeSavedListObject(componentName, newListObject);
};

export const handleCommittingItemChangesInStorage = (buttonReference) => {
    const parentForm = getParentForm(buttonReference);
    const formInput = getFormInput(parentForm);
    const formInputValue = formInput.value;

    if (formInputValue) {
        const componentReference = getComponentRef(buttonReference);
        const componentName = getComponentName(componentReference);
        const componentItems = getComponentItems(componentReference);
        const clickedItem = getClickedItem(buttonReference);
        const clickedItemIndex = getItemIndex(clickedItem, componentItems);

        const savedListObject = getSavedListObject(componentName);
        const newListObjectArray = savedListObject.items;
        newListObjectArray[clickedItemIndex] = addItemObject(formInputValue);

        const newListObject = {
            name: savedListObject.name,
            items: [...newListObjectArray]
        };

        changeSavedListObject(componentName, newListObject);
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
    const componentItems = getComponentItems(componentReference);
    const clickedItem = getClickedItem(buttonReference);
    const clickedItemIndex = getItemIndex(clickedItem, componentItems);

    const savedListObject = getSavedListObject(componentName);
    const newListObjectArray = savedListObject.items;
    newListObjectArray[clickedItemIndex].status = status;

    const newListObject = {
        name: savedListObject.name,
        items: [...newListObjectArray]
    };

    changeSavedListObject(componentName, newListObject);
};

const getBarProgression = (totalItemsNumberLenght, totalDoneItemsLenght) => {
    return (totalDoneItemsLenght / totalItemsNumberLenght) * 100;
};

export const handleRemovingListFromStorage = (buttonReference) => {
    const componentReference = getComponentRef(buttonReference);
    const componentName = getComponentName(componentReference);
    const numberOfSavedLists = getNumberOfSavedLists();
    const newListObjectArray = [];

    for (let counter = 0; counter < numberOfSavedLists; counter++) {
        if (counter != componentName) {
            newListObjectArray.push(getSavedListObject(counter));
        }
    }

    newListObjectArray.forEach((listObject, index) => changeSavedListObject(index, listObject));
    setNumberOfSavedLists(+numberOfSavedLists - 1);
    deleteSavedListObject(numberOfSavedLists);
};

const updateProgressBar = (componentReference) => {
    const progressContainer = componentReference.querySelector(progressContainerSelector);
    const totalItemsNumber = getComponentItems(componentReference);

    if (totalItemsNumber.length === 0) {
        progressContainer.hidden = true;
        return;
    }
    progressContainer.hidden = false;

    const totalDoneItemsLenght = componentReference.querySelectorAll(doneItemSelector).length;
    const progressContainerText = componentReference.querySelector(progressContainerTextSelector);
    progressContainerText.textContent = `${totalDoneItemsLenght}/${totalItemsNumber.length}`;

    const progressBar = componentReference.querySelector(progressBarSelector);
    const barProgression = getBarProgression(totalItemsNumber.length, totalDoneItemsLenght);
    progressBar.style.width = barProgression + '%';
};

export const updateProgressBars = () => {
    const progressBars = document.querySelectorAll(articleSelector);
    progressBars.forEach((progressBar) => updateProgressBar(progressBar));
};
