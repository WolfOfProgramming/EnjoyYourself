import { createInputForm } from './createInputForm';
import { createListContent } from './createListContent';

const COLORS_CLASSES = [
    'progress-container_color_red',
    'progress-container_color_green',
    'progress-container_color_yellow',
    'progress-container_color_accent'
];

const SVGS = [
    /* HTML */ `
        <svg class="svg" viewBox="0 0 24 24">
            <path
                class="path"
                d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9"
            />
        </svg>
    `,
    /* HTML */ `
        <svg class="svg" viewBox="0 0 24 24">
            <path
                class="path"
                d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
            />
        </svg>
    `,
    /* HTML */ `
        <svg class="svg" viewBox="0 0 24 24">
            <path
                class="path"
                d="M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z"
            />
        </svg>
    `,
    /* HTML */ `
        <svg class="svg" viewBox="0 0 24 24">
            <path
                class="path"
                d="M14.4,6H20V16H13L12.6,14H7V21H5V4H14L14.4,6M14,14H16V12H18V10H16V8H14V10L13,8V6H11V8H9V6H7V8H9V10H7V12H9V10H11V12H13V10L14,12V14M11,10V8H13V10H11M14,10H16V12H14V10Z"
            />
        </svg>
    `
];

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
            <div class="progress-container ${COLORS_CLASSES[listObjectName % 4]}" hidden>
                <div class="progress-bar"></div>
                <div class="progress-container__section">
                    <div class="progress-container__wrapper">
                        ${SVGS[listObjectName % 4]}
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
