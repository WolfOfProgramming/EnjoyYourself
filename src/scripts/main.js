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
    handleChangingProgressInStorage,
    handlePushingItemToScheduleStorage,
    handleDeletingItemFromScheduleStorage
} from './buttonClickHandlers';
import { resetElementContent } from './utilityFunctions';
import { renderFormSchedule } from './renderFormSchedule';

const mainSection = document.querySelector('.container');
const scheduleHeader = document.querySelector('.header_style_square');
const tableBody = document.querySelector('.table__body');

const lifeGoalsList = document.querySelector(
    '.component__list_type_life-goals'
);
const dreamsList = document.querySelector('.component__list_type_dreams');
const routinesList = document.querySelector('.component__list_type_routines');

const lifeGoalsHeader = document.querySelector('.header_type_life-goals');
const dreamsHeader = document.querySelector('.header_type_dreams');
const routinesHeader = document.querySelector('.header_type_routines');

const scheduleFormObject = {
    minuteTo: '00',
    minuteSince: '00',
    hourTo: '00',
    hourSince: '00'
};

lifeGoalsList.insertAdjacentHTML('beforeend', createListContent('life-goals'));
lifeGoalsHeader.insertAdjacentHTML('beforeend', renderInputForm('life-goals'));

dreamsList.insertAdjacentHTML('beforeend', createListContent('dreams'));
dreamsHeader.insertAdjacentHTML('beforeend', renderInputForm('dreams'));

routinesList.insertAdjacentHTML('beforeend', createListContent('routines'));
routinesHeader.insertAdjacentHTML('beforeend', renderInputForm('routines'));

scheduleHeader.insertAdjacentHTML('beforeend', renderFormSchedule());
tableBody.insertAdjacentHTML('beforeend', createTableContent('schedule'));

mainSection.addEventListener('click', e => {
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
                handleChangingProgressInStorage(clickedButton, 'Done');
                break;
            case 'progress':
                handleChangingProgressInStorage(clickedButton, 'In progress');
                break;
            case 'hang':
                handleChangingProgressInStorage(clickedButton, 'Not now');
                break;
            case 'confirm':
                handleCommittingItemChangesInStorage(clickedButton);
                break;
            case 'cancel':
                break;

            case 'edit':
                handleChangingItemValueInStorage(clickedButton);
                return;
        }

        resetElementContent(componentList);
        componentList.insertAdjacentHTML(
            'beforeend',
            createListContent(componentName)
        );
    }
});

scheduleHeader.addEventListener('input', e => {
    const input = e.target;
    switch (input.dataset.time) {
        case 'minuteTo':
            scheduleFormObject['minuteTo'] = formatInputValue(input.value);
            break;
        case 'minuteSince':
            scheduleFormObject['minuteSince'] = formatInputValue(input.value);
            break;
        case 'hourTo':
            scheduleFormObject['hourTo'] = formatInputValue(input.value);
            break;
        case 'hourSince':
            scheduleFormObject['hourSince'] = formatInputValue(input.value);
            break;
    }
    removeTimeParagraph();
    scheduleHeader.insertAdjacentHTML(
        'beforeend',
        createTimeParagraph(scheduleFormObject)
    );
});

scheduleHeader.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const clickedButton = e.target;
        handlePushingItemToScheduleStorage(clickedButton, scheduleFormObject);
        resetElementContent(tableBody);
        tableBody.insertAdjacentHTML(
            'beforeend',
            createTableContent('schedule')
        );
    }
});

tableBody.addEventListener('click', e => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        handleDeletingItemFromScheduleStorage(clickedButton);
        resetElementContent(tableBody);
        tableBody.insertAdjacentHTML(
            'beforeend',
            createTableContent('schedule')
        );
    }
});
