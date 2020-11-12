import React from "react";

// Function to handle errors while filling out forms
const FormsError = ({ children, errors, name }) => {
  const error = errors[name] || null;

  if (!error) {
    return null;
  }

  return (
    <div
      className="alert alert-danger"
      children={children(error.message)}
    ></div>
  );
};

export default FormsError;
