const ONES = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine'
];
const TEENS = [
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen'
];
const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Fourty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety'
];

export const convertNumbersToWords = (input: string) => {
  const findNumbers = /\d+/g;

  const numbers = input.match(findNumbers);
  if (numbers) {
    const numberString: string = numbers
      .map((number) => {
        const numberIndex = parseInt(number, 10);
        if (numberIndex < 10) {
          return ':' + ONES[numberIndex];
        }
        if (numberIndex < 20) {
          return ':' + TEENS[numberIndex - 10];
        }
        if (numberIndex < 100) {
          return (
            ':' + TENS[Math.floor(numberIndex / 10)] + ONES[numberIndex % 10]
          );
        }
        if (numberIndex < 1000) {
          const isWholeHundred = numberIndex % 100 === 0;
          let numberString =
            ':' + ONES[Math.floor(numberIndex / 100)] + ':Hundred';
          if (!isWholeHundred) {
            numberString +=
              ':And:' +
              TENS[Math.floor((numberIndex % 100) / 10)] +
              ':' +
              ONES[numberIndex % 10];
          }
          return numberString;
        }
        if (numberIndex < 1000000) {
          return (
            convertNumbersToWords(Math.floor(numberIndex / 1000).toString()) +
            ':Thousand' +
            convertNumbersToWords((numberIndex % 1000).toString())
          );
        }
        throw new Error('Numbers larger than 1 million are not supported');
      })
      .join(':');
    // The colon is used to assist with the regex in the changeCase function
    return input.replace(findNumbers, numberString);
  }
  // No numbers found, return input
  return input;
};

export default convertNumbersToWords;
