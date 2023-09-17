const ESC = "\u001b";
const RESET = ESC + "[0m";

export const md2htmlLog = (message: string) => {
  const prefix = ESC + "[92m" + "[md2html]" + RESET;
  return stdout(prefix, message);
};

export const png2thumbLog = (message: string) => {
  const prefix = ESC + "[35m" + "[png2thumb]" + RESET;
  return stdout(prefix, message);
};

export const scss2cssLog = (message: string) => {
  const prefix = ESC + "[95m" + "[scss2css]" + RESET;
  return stdout(prefix, message);
};

export const ts2jsLog = (message: string) => {
  const prefix = ESC + "[94m" + "[ts2js]" + RESET;
  return stdout(prefix, message);
};

export const distLog = (message: string) => {
  const prefix = ESC + "[33m" + "[dist]" + RESET;
  return stdout(prefix, message);
};

const stdout = (prefix: string, message: string) => {
  const time =
    "\x1b[1m\x1b[90m" + `[${new Date().toLocaleTimeString()}]` + RESET;
  return console.log([time, prefix, message].join(" "));
};
