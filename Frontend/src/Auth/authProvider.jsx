let tokenGetter = null;

export const setTokenGetter = (getterFn) => {
    tokenGetter = getterFn;
}

export const getAuthToken = async () => {
    if(!tokenGetter) return;
    return await tokenGetter();
}