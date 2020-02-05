import { renderInputForm } from './renderInputForm';
import { renderEditForm } from './renderEditForm';
import {
    createListContent,
    getSavedArray,
    changeSavedArray,
    resetComponent
} from './renderListContent';

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

const getElementIndex = (array, element) => {
    return Array.from(array).indexOf(element);
};

const getItems = parentElement => {
    return parentElement.querySelectorAll('.component__item');
};

mainSection.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (button) {
        const component = button.closest('article');
        const list = component.querySelector('ul');
        const data = component.dataset.name;
        const savedArray = getSavedArray(data);
        const buttonTask = button.dataset.task;
        const selectedItem = button.closest('li');
        const input = component.querySelector('.form-add__input');
        const itemsArray = getItems(list);
        const selectedItemIndex = getElementIndex(itemsArray, selectedItem);

        switch (buttonTask) {
            case 'add':
                if (input.value) {
                    const newArray = [
                        ...savedArray,
                        {
                            type: data,
                            value: input.value,
                            date: new Date().toLocaleString(),
                            isDone: false
                        }
                    ];
                    changeSavedArray(data, newArray);
                    resetComponent(list);
                    list.insertAdjacentHTML(
                        'beforeend',
                        createListContent(data)
                    );
                }
                break;
            case 'delete':
                savedArray.splice(selectedItemIndex, 1);

                changeSavedArray(data, savedArray);
                resetComponent(list);
                list.insertAdjacentHTML('beforeend', createListContent(data));

                break;
            case 'edit':
                selectedItem.textContent = '';
                selectedItem.insertAdjacentHTML('beforeend', renderEditForm());
                break;
            case 'check':
                break;
            case 'confirm':
                const localInput = selectedItem.querySelector(
                    '.form-add__input'
                );
                if (localInput.value) {
                    savedArray[selectedItemIndex] = {
                        type: data,
                        value: localInput.value,
                        date: new Date().toLocaleString(),
                        isDone: false
                    };

                    changeSavedArray(data, savedArray);
                    resetComponent(list);
                    list.insertAdjacentHTML(
                        'beforeend',
                        createListContent(data)
                    );
                }
                break;
            case 'cancel':
                resetComponent(list);
                list.insertAdjacentHTML('beforeend', createListContent(data));
                break;
        }
    }
});
