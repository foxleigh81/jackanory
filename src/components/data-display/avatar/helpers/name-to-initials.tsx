export const nameToInitials = (name: string) => {
  if (!name) {
    throw new Error('No name provided');
  }
  const nameParts = name.trim().toUpperCase().split(' ');
  const firstInitial = nameParts[0][0];
  const lastInitial = nameParts[nameParts.length - 1][0];
  if (nameParts.length === 1) {
    return firstInitial;
  }
  if (nameParts.length === 2 || nameParts.length > 3) {
    return `${firstInitial}${lastInitial}`;
  }
  return nameParts.map((part) => part[0]).join('');
};
