export const getSavedArray = componentName => {
    return JSON.parse(localStorage.getItem(componentName)) || [];
};

export const changeSavedArray = (componentName, newArray) => {
    localStorage.setItem(componentName, JSON.stringify(newArray));
};

export const resetListContent = list => {
    list.textContent = '';
};

const renderItemString = ({ value, date, isDone }) => {
    return /* HTML */ `
        <li class="item component__item">
            <div class="item__section">
                <button
                    class="button button_type_check ${isDone
                        ? 'button_active'
                        : ''}"
                    type="button"
                    data-task="check"
                >
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"
                        />
                    </svg>
                    <svg class="svg svg_active" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                    </svg>
                </button>
                <p class="item__description">${value}</p>
            </div>
            <div class="item__options">
                <time class="item__date">${date}</time>
                <button
                    class="button button_type_edit"
                    type="button"
                    data-task="edit"
                >
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                        />
                    </svg>
                </button>
                <button
                    class="button button_type_delete"
                    type="button"
                    data-task="delete"
                >
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                        />
                    </svg>
                </button>
            </div>
        </li>
    `;
};

const renderStringsArray = array => {
    return array.map(item => renderItemString(item));
};

const renderList = array => {
    const stringsArray = renderStringsArray(array);
    return stringsArray.reduce((acc, el) => acc + el, '');
};

export const createListContent = listName => {
    const savedArray = getSavedArray(listName);
    return renderList(savedArray);
};
