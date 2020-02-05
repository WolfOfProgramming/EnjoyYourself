import { renderInputForm } from './renderInputForm';
import { createListContent, resetListContent } from './renderListContent';

import {
    handleAddButton,
    handleDeleteButton,
    handleEditButton,
    handleConfirmButton,
    handleCheckButton
} from './buttonClickHandlers';

const mainSection = document.querySelector('.container');

const lifeGoalsList = document.querySelector(
    '.component__list_type_life-goals'
);
const dreamsList = document.querySelector('.component__list_type_dreams');
const routinesList = document.querySelector('.component__list_type_routines');

const lifeGoalsSection = document.querySelector('.section_type_life-goals');
const dreamsSection = document.querySelector('.section_type_dreams');
const routinesSection = document.querySelector('.section_type_routines');

lifeGoalsList.insertAdjacentHTML('beforeend', createListContent('life-goals'));
lifeGoalsSection.insertAdjacentHTML('beforeend', renderInputForm('life-goals'));

dreamsList.insertAdjacentHTML('beforeend', createListContent('dreams'));
dreamsSection.insertAdjacentHTML('beforeend', renderInputForm('dreams'));

routinesList.insertAdjacentHTML('beforeend', createListContent('routines'));
routinesSection.insertAdjacentHTML('beforeend', renderInputForm('routines'));

mainSection.addEventListener('click', e => {
    const clickedButton = e.target.closest('button');
    if (clickedButton) {
        const component = clickedButton.closest('article');
        const componentList = component.querySelector('ul');
        const componentName = component.dataset.name;
        const buttonTask = clickedButton.dataset.task;

        switch (buttonTask) {
            case 'add':
                handleAddButton(clickedButton, componentName);
                break;
            case 'delete':
                handleDeleteButton(clickedButton, componentName, component);
                break;
            case 'check':
                handleCheckButton(clickedButton, componentName, component);
                break;
            case 'confirm':
                handleConfirmButton(clickedButton, componentName, component);
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
