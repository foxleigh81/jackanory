import { convertNumbersToWords } from './convert-numbers-to-words';
import { normalizeCase } from './normalise-case';
import { convertSymbolsToWords } from './convert-symbols-to-words';

export const changeCase = (input: string, type: string, mode?: string) => {
  const str = input.trim();

  // Check if input is likely all-caps (more permissive check)
  const isAllCaps = /^[A-Z\s\-\_\.:]+$/.test(str) && str === str.toUpperCase();

  if (isAllCaps) {
    const wordArray = str
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    switch (type) {
      case 'snake':
        return wordArray.join('_');
      case 'kebab':
        return wordArray.join('-');
      case 'pascal':
        return wordArray
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join('');
      case 'camel':
        return wordArray
          .map((word, index) => {
            if (index === 0) {
              return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join('');
      case 'title':
        return wordArray
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(' ');
      case 'sentence':
      default:
        return wordArray
          .map((word, index) => {
            if (index === 0) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
          })
          .join(' ');
    }
  }

  // For other case types, use the complex processing (unless simple mode is enabled)
  let normalisedStr: string;
  if (mode === 'simple') {
    normalisedStr = normalizeCase(str);
  } else {
    const firstPass = convertSymbolsToWords(str);
    const secondPass = convertNumbersToWords(firstPass);
    normalisedStr = normalizeCase(secondPass);
  }

  const wordArray = normalisedStr.split(' ');

  switch (type) {
    case 'snake':
      return wordArray.join('_').toLowerCase();
    case 'kebab':
      return wordArray.join('-').toLowerCase();
    case 'pascal':
      return wordArray
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
    case 'camel':
      return wordArray
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
    case 'title':
      return wordArray
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    case 'sentence':
    default:
      return wordArray
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
          return word.toLowerCase();
        })
        .join(' ');
  }
};

export default changeCase;
