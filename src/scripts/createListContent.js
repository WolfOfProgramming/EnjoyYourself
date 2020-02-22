const STATUS_DONE_NAME = 'done';
const STATUS_IN_PROGRESS_NAME = 'in_progress';
const STATUS_NOT_NOW_NAME = 'not_now';
const CLASS_ACTIVE_BUTTON = 'button_active';

const statusOrder = [STATUS_IN_PROGRESS_NAME, STATUS_NOT_NOW_NAME, STATUS_DONE_NAME];

export function compare(a, b) {
    const aIndex = statusOrder.indexOf(a.status);
    const bIndex = statusOrder.indexOf(b.status);
    return aIndex - bIndex;
}

const renderItemString = ({ value, status }) => {
    return /* HTML */ `
        <li class="item component__item">
            <div class="item__section">
                <p class="item__description">${value}</p>
            </div>
            <div class="item__options">
                <div class="item__status-options">
                    <button
                        class="button button_type_done ${status === STATUS_DONE_NAME
                            ? CLASS_ACTIVE_BUTTON
                            : ''}"
                        type="button"
                        data-task="done"
                    >
                        <svg class="svg" viewBox="0 0 24 24">
                            <path
                                class="path"
                                d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                            />
                        </svg>
                    </button>
                    <button
                        class="button button_type_in-progress ${status === STATUS_IN_PROGRESS_NAME
                            ? CLASS_ACTIVE_BUTTON
                            : ''}"
                        type="button"
                        data-task="in_progress"
                    >
                        <svg class="svg" viewBox="0 0 24 24">
                            <path
                                class="path"
                                d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M15.5,8.5L10.62,13.38L8.5,11.26L7.44,12.32L10.62,15.5L16.56,9.56L15.5,8.5M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37Z"
                            />
                        </svg>
                    </button>
                    <button
                        class="button button_type_not-now ${status === STATUS_NOT_NOW_NAME
                            ? CLASS_ACTIVE_BUTTON
                            : ''}"
                        type="button"
                        data-task="not_now"
                    >
                        <svg class="svg" viewBox="0 0 24 24">
                            <path
                                class="path"
                                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                            />
                        </svg>
                    </button>
                </div>
                <div class="item__edit-options">
                    <button class="button button_type_edit" type="button" data-task="edit">
                        <svg class="svg" viewBox="0 0 24 24">
                            <path
                                class="path"
                                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                            />
                        </svg>
                    </button>
                    <button class="button button_type_delete" type="button" data-task="delete">
                        <svg class="svg" viewBox="0 0 24 24">
                            <path
                                class="path"
                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    `;
};

const renderStringsArray = (itemsArray) => {
    return itemsArray.map((item) => renderItemString(item));
};

export const createListContent = (itemsArray) => {
    console.log(itemsArray);
    const stringsArray = renderStringsArray(itemsArray);
    return stringsArray.reduce((acc, cur) => acc + cur, '');
};
