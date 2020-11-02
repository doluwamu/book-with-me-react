
export const extractApiErrors = (resError) => {
  let errors = [{ title: "Errors!", detail: "Ooops!, something went wrong" }];

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }
  return errors;
};

export * from './auth';
export * from './rentals'
export * from './bookings'
