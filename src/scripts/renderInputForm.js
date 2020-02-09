export const renderInputForm = name => {
    return /* HTML */ `
        <form class="form-add">
            <input
                class="form-add__input"
                type="text"
                placeholder="Add another ${name}."
            />
            <button
                class="button button_type_add"
                type="button"
                data-task="add"
            >
                Add
            </button>
        </form>
    `;
};
