
import axiosService from "services/AxiosService";
const { bwmAxios } = axiosService;

// Function to get server errors while performing an action
export const extractApiErrors = (resError) => {
  let errors = [{ title: "Errors!", detail: "Ooops!, something went wrong" }];

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }
  return errors;
};

export const deleteResource = ({url, resource}) => dispatch => {
  return bwmAxios.delete(url)
  .then(res => res.data)
  .then(({id}) => {
    dispatch({
      type: "DELETE_RESOURCE",
      id,
      resource
    })
  })
  .catch(error => {
    dispatch({
      type: "REQUEST_ERROR",
      errors: extractApiErrors(error.response || []),
      resource
    })
  })
}

// All actions
export * from './auth';
export * from './rentals'
export * from './bookings'
