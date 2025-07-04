export const convertSymbolsToWords = (input: string) => {
  return input
    .replace(/&/g, ':And')
    .replace(/@/g, ':At')
    .replace(/#/g, ':Hash')
    .replace(/\$/g, ':Dollar')
    .replace(/£/g, ':Pound')
    .replace(/%/g, ':Percent')
    .replace(/\+/g, ':Plus')
    .replace(/\*/g, ':Asterisk');
};

export default convertSymbolsToWords;
