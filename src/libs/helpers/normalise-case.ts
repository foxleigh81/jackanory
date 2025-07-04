import { detectCase } from './detect-case';

const removeExtraSpaces = (input: string) => {
  return input.replace(/\s{2,}/g, ' ').trim();
};

export const normalizeCase = (input: string) => {
  const caseType = detectCase(input);
  const words = input.split(/(?=[A-Z:])/).filter((word) => word !== ':');
  const lowerCasedWords = words.slice(1).map((word) => word.toLowerCase());

  if (caseType === 'snake') {
    const str = input.replace(/_/g, ' ').toLowerCase().replace(/:/g, ' ');
    return removeExtraSpaces(str);
  }

  if (caseType === 'pascal') {
    const str = input
      .split(/(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join(' ')
      .replace(/:/g, ' ');
    return removeExtraSpaces(str);
  }

  if (caseType === 'camel') {
    lowerCasedWords.unshift(words[0].toLowerCase());
    const str = lowerCasedWords.join(' ');
    return removeExtraSpaces(str);
  }

  if (caseType === 'kebab') {
    const str = input.replace(/-/g, ' ').replace(/:/g, ' ').toLowerCase();
    return removeExtraSpaces(str);
  }

  if (caseType === 'sentence') {
    return removeExtraSpaces(input.replace(/:/g, ''));
  }

  if (caseType === 'upper') {
    const str = input.toLowerCase().replace(/:/g, ' ');
    return removeExtraSpaces(str);
  }

  return removeExtraSpaces(input);
};

export default normalizeCase;
