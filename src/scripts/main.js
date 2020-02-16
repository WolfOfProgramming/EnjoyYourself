import { createInputForm } from './createInputForm';
import { createListContent } from './createListContent';
import {
    createTimeParagraph,
    removeTimeParagraph,
    formatInputValue,
    createTableContent
} from './renderSchedule';
import {
    handleAddingValueToStorage,
    handleDeletingValueFromStorage,
    handleChangingItemValueInStorage,
    handleCommittingItemChangesInStorage,
    handleChangingStatusInStorage,
    handlePushingItemToScheduleStorage,
    handleDeletingItemFromScheduleStorage,
    updateProgressBars,
    handleRemovingListFromStorage
} from './buttonClickHandlers';

import {
    resetElementContent,
    qs,
    getNumberOfSavedLists,
    createListObject,
    addListObjectToLocalStorage,
    setNumberOfSavedLists
} from './utilityFunctions';

import { renderLists } from './renderLists';

import { renderFormSchedule } from './renderFormSchedule';

const buttonOpenPopup = qs('.button_type_add-list');
const buttonClosePopup = qs('.button_type_close');
const popupWindow = qs('.popup');
const buttonAddList = qs('.popup-window__button');

const listsContainer = qs('.container-flex');

const scheduleHeader = qs('.header_style_square');
const tableBody = qs('.table__body');

const scheduleFormObject = {
    minuteTo: '00',
    minuteSince: '00',
    hourTo: '00',
    hourSince: '00'
};

listsContainer.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        const component = clickedButton.closest('article');
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

// scheduleHeader.addEventListener('input', (e) => {
//     const input = e.target;
//     const inputData = input.dataset.time;
//     scheduleFormObject[inputData] = formatInputValue(input.value);
//     removeTimeParagraph();
//     scheduleHeader.insertAdjacentHTML('beforeend', createTimeParagraph(scheduleFormObject));
// });

// scheduleHeader.addEventListener('click', (e) => {
//     if (e.target.tagName === 'BUTTON') {
//         const clickedButton = e.target;
//         handlePushingItemToScheduleStorage(clickedButton, scheduleFormObject);
//         resetElementContent(tableBody);
//         tableBody.insertAdjacentHTML('beforeend', createTableContent('schedule'));
//     }
// });

// tableBody.addEventListener('click', (e) => {
//     const clickedButton = e.target.closest('button');
//     if (clickedButton) {
//         handleDeletingItemFromScheduleStorage(clickedButton);
//         resetElementContent(tableBody);
//         tableBody.insertAdjacentHTML('beforeend', createTableContent('schedule'));
//     }
// });

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
