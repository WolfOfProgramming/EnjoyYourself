import { getSavedArray, changeSavedArray } from './renderListContent';
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

export const handleAddButton = buttonReference => {
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

export const handleDeleteButton = buttonReference => {
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

export const handleConfirmButton = buttonReference => {
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

export const handleEditButton = buttonReference => {
    if (!hasOtherLiveEdits()) {
        const parentItem = buttonReference.closest('li');
        parentItem.textContent = '';
        parentItem.insertAdjacentHTML('beforeend', renderEditForm());
    }
};

export const handleChangingProgress = (buttonReference, progress) => {
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
