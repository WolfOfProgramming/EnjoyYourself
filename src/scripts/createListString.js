import { createInputForm } from './createInputForm';
import { createListContent } from './createListContent';

export const createListString = ({ name, items }, listObjectName) => {
    return /* HTML */ `
        <article class="component" data-name="${listObjectName}">
            <header class="header">
                <h3 class="header__title">${name}</h3>
                <button class="button button_type_remove" type="button" data-task="remove">
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                    </svg>
                </button>
                ${createInputForm()}
            </header>
            <div class="progress-container" hidden>
                <div class="progress-bar"></div>
                <div class="progress-container__section">
                    <div class="progress-container__wrapper">
                        <svg class="svg" viewBox="0 0 24 24">
                            <path
                                class="path"
                                d="M14.4,6H20V16H13L12.6,14H7V21H5V4H14L14.4,6M14,14H16V12H18V10H16V8H14V10L13,8V6H11V8H9V6H7V8H9V10H7V12H9V10H11V12H13V10L14,12V14M11,10V8H13V10H11M14,10H16V12H14V10Z"
                            />
                        </svg>
                        <p class="progress-container__paragraph">Completed Tasks</p>
                    </div>
                    <p class="progress-container__progression-text"></p>
                </div>
            </div>
            <ul class="component__list">
                ${createListContent(items)}
            </ul>
        </article>
    `;
};
