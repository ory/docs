export const randomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
export const randomEmail = () => randomString() + "@" + randomString() + ".dev";
