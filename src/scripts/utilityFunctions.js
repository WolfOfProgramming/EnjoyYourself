export const getSavedArray = componentName => {
    return JSON.parse(localStorage.getItem(componentName)) || [];
};

export const changeSavedArray = (componentName, newArray) => {
    localStorage.setItem(componentName, JSON.stringify(newArray));
};

export const resetElementContent = element => {
    element.textContent = '';
};
