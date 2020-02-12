import { getSavedArray } from './utilityFunctions';

export const createTimeParagraph = ({ hourSince, minuteSince, hourTo, minuteTo }) => {
    return /* HTML */ `
        <p class="header__time-example">
            Since:
            <time class="header__since">${hourSince}:${minuteSince}</time>
            To:
            <time class="header__to">${hourTo}:${minuteTo}</time>
        </p>
    `;
};

export const removeTimeParagraph = () => {
    const timeParagraph = document.querySelector('.header__time-example');
    if (timeParagraph) {
        timeParagraph.remove();
    }
};

export const formatInputValue = (inputValue) => {
    if (inputValue < 10) {
        return '0' + inputValue;
    }
    return inputValue;
};

export const resetScheduleContent = (schedule) => {
    schedule.textContent = '';
};

const renderTableRow = ({ hourSince, minuteSince, hourTo, minuteTo, description }) => {
    return /* HTML */ `
        <tr class="table__row">
            <td class="table__data-cell">${hourSince}:${minuteSince}</td>
            <td class="table__data-cell">${hourTo}:${minuteTo}</td>
            <td class="table__data-cell">${description}</td>
            <td class="table__data-cell">
                <button class="button button_type_delete" type="button">
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    `;
};

const renderStringsArray = (array) => {
    return array.map((item) => renderTableRow(item));
};

const renderRows = (array) => {
    const stringsArray = renderStringsArray(array);
    return stringsArray.reduce((acc, el) => acc + el, '');
};

export const createTableContent = (localStorageIdentifier) => {
    const savedArray = getSavedArray(localStorageIdentifier);
    return renderRows(savedArray);
};
