
// Function to check the similarities between two fields
export const sameAs = (field, getValues) => (value) => {
  const compareTo = getValues()[field];

  return compareTo === value;
};
