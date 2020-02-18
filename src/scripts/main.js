import {
    handleAddingValueToStorage,
    handleDeletingValueFromStorage,
    handleChangingItemValueInStorage,
    handleCommittingItemChangesInStorage,
    handleChangingStatusInStorage,
    updateProgressBars,
    handleRemovingListFromStorage
} from './buttonClickHandlers';

import {
    qs,
    getNumberOfSavedLists,
    createListObject,
    addListObjectToLocalStorage,
    setNumberOfSavedLists
} from './utilityFunctions';

import { renderLists } from './renderLists';

const buttonOpenPopup = qs('.button_type_add-list');
const buttonClosePopup = qs('.button_type_close');
const popupWindow = qs('.popup');
const buttonAddList = qs('.popup-window__button');

const listsContainer = qs('.container-flex');

listsContainer.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        const buttonTask = clickedButton.dataset.task;

        switch (buttonTask) {
            case 'add':
                handleAddingValueToStorage(clickedButton);
                break;

            case 'delete':
                handleDeletingValueFromStorage(clickedButton);
                break;

            case 'done':
            case 'in_progress':
            case 'not_now':
                handleChangingStatusInStorage(clickedButton, buttonTask);
                break;

            case 'confirm':
                handleCommittingItemChangesInStorage(clickedButton);
                break;

            case 'remove':
                handleRemovingListFromStorage(clickedButton);
                break;

            case 'edit':
                handleChangingItemValueInStorage(clickedButton);
                return;

            default:
                break;
        }

        resetListsContainer();
        listsContainer.insertAdjacentHTML('beforeend', renderLists());
        updateProgressBars();
    }
});

buttonOpenPopup.addEventListener('click', () => {
    popupWindow.hidden = false;
});

buttonClosePopup.addEventListener('click', () => {
    popupWindow.hidden = true;
});

const resetListsContainer = () => {
    listsContainer.textContent = '';
};

buttonAddList.addEventListener('click', () => {
    const input = popupWindow.querySelector('.popup-window__input');
    const inputValue = input.value;

    if (inputValue) {
        const numberOfSavedLists = getNumberOfSavedLists();
        const listObject = createListObject(inputValue);
        addListObjectToLocalStorage(numberOfSavedLists, listObject);
        setNumberOfSavedLists(+numberOfSavedLists + 1);

        resetListsContainer();
        listsContainer.insertAdjacentHTML('beforeend', renderLists());
        updateProgressBars();
    }
});

listsContainer.insertAdjacentHTML('beforeend', renderLists());
updateProgressBars();
