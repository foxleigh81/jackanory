/**
 * Generates an ID for the input if one is not provided
 * @param input the string to turn into an ID.
 * @returns string
 */
export const generateInputId = (input: string, componentType?: string) => {
  let id = `${input.toLowerCase().replace(' ', '-')}`;
  if (componentType) {
    id = `${componentType.toLowerCase()}-${id}`;
  }
  return id;
};

export default generateInputId;
