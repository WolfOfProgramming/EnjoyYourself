const createParagraph = ({ hourSince, minuteSince, hourTo, minuteTo }) => {
    return /* HTML */ `
        <p class="header__time-example">
            Since:
            <time class="header__since">${hourSince}:${minuteSince}</time>
            To:
            <time class="header__to">${hourTo}:${minuteTo}</time>
        </p>
    `;
};
