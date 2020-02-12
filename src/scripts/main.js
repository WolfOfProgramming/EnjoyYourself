import { renderInputForm } from './renderInputForm';
import { createListContent } from './renderListContent';
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
    handleDeletingItemFromScheduleStorage
} from './buttonClickHandlers';
import { resetElementContent, qs } from './utilityFunctions';
import { renderFormSchedule } from './renderFormSchedule';

const mainSection = qs('.container');
const scheduleHeader = qs('.header_style_square');
const tableBody = qs('.table__body');

const lifeGoalsList = qs('.component__list_type_life-goals');
const dreamsList = qs('.component__list_type_dreams');
const routinesList = qs('.component__list_type_routines');

const lifeGoalsHeader = qs('.header_type_life-goals');
const dreamsHeader = qs('.header_type_dreams');
const routinesHeader = qs('.header_type_routines');

const scheduleFormObject = {
    minuteTo: '00',
    minuteSince: '00',
    hourTo: '00',
    hourSince: '00'
};

const STATUS = {
    done: 'Done',
    in_progress: 'In progress',
    not_now: 'Not now'
};

lifeGoalsList.insertAdjacentHTML('beforeend', createListContent('life-goals'));
lifeGoalsHeader.insertAdjacentHTML('beforeend', renderInputForm('life-goals'));

dreamsList.insertAdjacentHTML('beforeend', createListContent('dreams'));
dreamsHeader.insertAdjacentHTML('beforeend', renderInputForm('dreams'));

routinesList.insertAdjacentHTML('beforeend', createListContent('routines'));
routinesHeader.insertAdjacentHTML('beforeend', renderInputForm('routines'));

scheduleHeader.insertAdjacentHTML('beforeend', renderFormSchedule());
tableBody.insertAdjacentHTML('beforeend', createTableContent('schedule'));

mainSection.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        const component = clickedButton.closest('article');
        const componentName = component.dataset.name;
        const componentList = component.querySelector('ul');
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
                handleChangingStatusInStorage(clickedButton, STATUS[buttonTask]);
                break;

            case 'confirm':
                handleCommittingItemChangesInStorage(clickedButton);
                break;

            case 'edit':
                handleChangingItemValueInStorage(clickedButton);
                return;

            default:
                break;
        }

        resetElementContent(componentList);
        componentList.insertAdjacentHTML('beforeend', createListContent(componentName));
    }
});

scheduleHeader.addEventListener('input', (e) => {
    const input = e.target;
    const inputData = input.dataset.time;

    switch (inputData) {
        case 'minuteTo':
            scheduleFormObject[inputData] = formatInputValue(input.value);
            break;
        case 'minuteSince':
            scheduleFormObject[inputData] = formatInputValue(input.value);
            break;
        case 'hourTo':
            scheduleFormObject[inputData] = formatInputValue(input.value);
            break;
        case 'hourSince':
            scheduleFormObject[inputData] = formatInputValue(input.value);
            break;
    }

    removeTimeParagraph();
    scheduleHeader.insertAdjacentHTML('beforeend', createTimeParagraph(scheduleFormObject));
});

scheduleHeader.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const clickedButton = e.target;
        handlePushingItemToScheduleStorage(clickedButton, scheduleFormObject);
        resetElementContent(tableBody);
        tableBody.insertAdjacentHTML('beforeend', createTableContent('schedule'));
    }
});

tableBody.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        handleDeletingItemFromScheduleStorage(clickedButton);
        resetElementContent(tableBody);
        tableBody.insertAdjacentHTML('beforeend', createTableContent('schedule'));
    }
});
