import logger from "../../config/logger";

export const convertObjectToParameters = (obj: any): string[] => {
  const keys = Object.keys(obj);
  const parameters: string[] = [];
  for (let key of keys) {
    parameters.push(key);
    parameters.push(obj[key]);
  }
  return parameters;
};

export const convertArrayParametersToObject = (arr: string[]) => {
  let obj: any = {};
  for (let index = 0; index < arr.length; ) {
    obj[arr[index]] = arr[index + 1];
    index += 2;
  }
  return obj;
};

export const getTodayFromDateTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}-${month}-${day}`;
  return today;
};
