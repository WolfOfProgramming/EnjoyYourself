export const renderEditForm = () => {
    return /* HTML */ `
        <form class="form-edit">
            <input class="form-edit__input" type="text" placeholder="Enter a new value." />
            <div class="form-edit__buttons-container">
                <button class="button button_type_add" type="button" data-task="confirm">
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M21.59,11.59L13.5,19.68L9.83,16L8.42,17.41L13.5,22.5L23,13M6.43,11L8.5,5.5L10.57,11M12.45,16H14.54L9.43,3H7.57L2.46,16H4.55L5.67,13H11.31L12.45,16Z"
                        />
                    </svg>
                </button>
                <button class="button button_type_add" type="button" data-task="cancel">
                    <svg class="svg" viewBox="0 0 24 24">
                        <path
                            class="path"
                            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    `;
};
