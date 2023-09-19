export const sanitizeWithOne = (inputs: HTMLInputElement[]) => {
  inputs.map((input) => {
    if (!isInteger(input.value)) {
      input.value = "1";
    }
  });
};

const isInteger = (value: string): boolean => {
  return /^-?([1-9]\d*|0)$/.test(value);
};
