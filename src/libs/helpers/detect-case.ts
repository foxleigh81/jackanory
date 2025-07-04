export const detectCase = (input: string) => {
  const snakeCaseRegex = /^(?:[a-zA-Z:]+_[a-zA-Z:]+)+$/;
  const pascalCaseRegex = /^(?:[A-Z]{1}[a-zA-Z:]+[A-Z]{1}[a-zA-Z:]+)+$/;
  const camelCaseRegex = /^(?:[a-z]{1}[a-zA-Z:]+[A-Z]{1}[a-zA-Z:]+)+$/;
  const sentenceCaseRegex = /^(?:[a-zA-Z:]+ [a-zA-Z:]+)+$/;
  const kebabCaseRegex = /^(?:[a-zA-Z:]+-[a-zA-Z:]+)+$/;
  const upperCaseRegex = /^[A-Z\s:]+$/;

  // Check for all-caps first to avoid false matches with other patterns
  if (upperCaseRegex.test(input)) {
    return 'upper';
  }
  if (snakeCaseRegex.test(input)) {
    return 'snake';
  }
  if (pascalCaseRegex.test(input)) {
    return 'pascal';
  }
  if (camelCaseRegex.test(input)) {
    return 'camel';
  }
  if (sentenceCaseRegex.test(input)) {
    return 'sentence';
  }
  if (kebabCaseRegex.test(input)) {
    return 'kebab';
  }
  return 'unknown';
};

export default detectCase;
