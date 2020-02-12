export const renderFormSchedule = () => {
    return /* HTML */ `
        <form class="form-schedule">
            <div class="form-schedule__wrapper form-schedule__wrapper_time-type_since">
                <p class="form-schedule__description">
                    Choose task start time.
                </p>
                <div class="form-schedule__interface">
                    <label for="inputHourSince">Hour</label>
                    <input
                        class="form-schedule__input"
                        type="range"
                        min="0"
                        max="23"
                        id="inputHourSince"
                        name="inputHourSince"
                        data-time="hourSince"
                    />
                </div>
                <div class="form-schedule__interface">
                    <label for="inputMinuteSince">Minutes</label>
                    <input
                        class="form-schedule__input"
                        type="range"
                        min="0"
                        max="59"
                        id="inputMinuteSince"
                        name="inputMinuteSince"
                        data-time="minuteSince"
                    />
                </div>
            </div>
            <div class="form-schedule__wrapper form-schedule__wrapper_time-type_to">
                <p class="form-schedule__description">Choose task end time.</p>
                <div class="form-schedule__interface">
                    <label for="inputHourTo">Hour</label>
                    <input
                        class="form-schedule__input"
                        type="range"
                        min="0"
                        max="23"
                        id="inputHourTo"
                        name="inputHourTo"
                        data-time="hourTo"
                    />
                </div>
                <div class="form-schedule__interface">
                    <label for="inputMinuteTo">Minutes</label>
                    <input
                        class="form-schedule__input"
                        type="range"
                        min="0"
                        max="59"
                        id="inputMinuteTo"
                        name="inputMinuteTo"
                        data-time="minuteTo"
                    />
                </div>
            </div>
            <div class="form-schedule__wrapper">
                <p class="form-schedule__description">Write down some text.</p>
                <div class="form-schedule__interface">
                    <input
                        class="form-schedule__input form-schedule__input_type_text"
                        type="text"
                        placeholder="Add task description"
                    />
                    <button class="button button_type_add" type="button">
                        Add
                    </button>
                </div>
            </div>
        </form>
    `;
};
