export const createInputForm = () => {
    return /* HTML */ `
        <form class="form-add">
            <input class="form-add__input" type="text" placeholder="Add another element." />
            <button class="button button_type_add" type="button" data-task="add">
                Add
            </button>
        </form>
    `;
};
