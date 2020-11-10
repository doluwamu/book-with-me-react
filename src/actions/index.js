
// Function to get server errors while performing an action
export const extractApiErrors = (resError) => {
  let errors = [{ title: "Errors!", detail: "Ooops!, something went wrong" }];

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }
  return errors;
};

// All actions
export * from './auth';
export * from './rentals'
export * from './bookings'
