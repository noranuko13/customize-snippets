export const sanitizeWithOne = (inputs: HTMLInputElement[]) => {
  inputs.map((input) => {
    if (!isInteger(input.value)) {
      input.value = "1";
    }
  });
};

export const isDate = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

const isInteger = (value: string): boolean => {
  return /^-?([1-9]\d*|0)$/.test(value);
};
