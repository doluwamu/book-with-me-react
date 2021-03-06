import React from "react";

// Function to display server errors
const ApiError = ({ errors }) => {
  return (
    <>
      {errors && errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error) => (
            <p key={error.title}>{error.detail}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default ApiError;
