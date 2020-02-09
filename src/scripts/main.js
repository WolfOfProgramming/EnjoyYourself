import { renderInputForm } from './renderInputForm';
import { createListContent, resetListContent } from './renderListContent';

import {
    handleAddButton,
    handleDeleteButton,
    handleEditButton,
    handleConfirmButton,
    handleChangingProgress
} from './buttonClickHandlers';

const mainSection = document.querySelector('.container');
const scheduleForm = document.querySelector('.form-schedule');

const lifeGoalsList = document.querySelector(
    '.component__list_type_life-goals'
);
const dreamsList = document.querySelector('.component__list_type_dreams');
const routinesList = document.querySelector('.component__list_type_routines');

const lifeGoalsHeader = document.querySelector('.header_type_life-goals');
const dreamsHeader = document.querySelector('.header_type_dreams');
const routinesHeader = document.querySelector('.header_type_routines');

const scheduleFormObject = {
    minuteTo: 0,
    minuteSince: 0,
    hourTo: 0,
    hourSince: 0
};

lifeGoalsList.insertAdjacentHTML('beforeend', createListContent('life-goals'));
lifeGoalsHeader.insertAdjacentHTML('beforeend', renderInputForm('life-goals'));

dreamsList.insertAdjacentHTML('beforeend', createListContent('dreams'));
dreamsHeader.insertAdjacentHTML('beforeend', renderInputForm('dreams'));

routinesList.insertAdjacentHTML('beforeend', createListContent('routines'));
routinesHeader.insertAdjacentHTML('beforeend', renderInputForm('routines'));

mainSection.addEventListener('click', e => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        const component = clickedButton.closest('article');
        const componentName = component.dataset.name;
        const componentList = component.querySelector('ul');
        const buttonTask = clickedButton.dataset.task;

        switch (buttonTask) {
            case 'add':
                handleAddButton(clickedButton);
                break;
            case 'delete':
                handleDeleteButton(clickedButton);
                break;
            case 'done':
                handleChangingProgress(clickedButton, 'Done');
                break;
            case 'progress':
                handleChangingProgress(clickedButton, 'In progress');
                break;
            case 'hang':
                handleChangingProgress(clickedButton, 'Not now');
                break;
            case 'confirm':
                handleConfirmButton(clickedButton);
                break;
            case 'cancel':
                break;

            case 'edit':
                handleEditButton(clickedButton);
                return;
        }

        resetListContent(componentList);
        componentList.insertAdjacentHTML(
            'beforeend',
            createListContent(componentName)
        );
    }
});

scheduleForm.addEventListener('input', e => {
    const input = e.target;
    switch (input.dataset.time) {
        case 'minuteTo':
            scheduleFormObject['minuteTo'] = input.value;
            break;
        case 'minuteSince':
            scheduleFormObject['minuteSince'] = input.value;
            break;
        case 'hourTo':
            scheduleFormObject['hourTo'] = input.value;
            break;
        case 'hourSince':
            scheduleFormObject['hourSince'] = input.value;
            break;
    }
    console.log(scheduleFormObject);
});
