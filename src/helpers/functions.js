
import moment from 'moment';

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


export const formatDate = (date, dateFormat = 'YYYY/MM/DD') => {
  if (!date || typeof date !== "string") {
    return "";
  }

  return moment(date).format(dateFormat)
}