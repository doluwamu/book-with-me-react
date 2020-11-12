
// Function for capitalizing first letter of a name e.g San Fransisco
export const capitalize = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  return value
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
