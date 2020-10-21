import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormsError from "./FormsError";

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const Error = ({ children }) => (
    <div className="alert alert-danger">{children}</div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register({
            required: "Email is required!",
            pattern: {
              value: EMAIL_PATTERN,
              message: "Not valid email format!",
            },
          })}
          type="email"
          name="email"
          className="form-control"
          id="email"
        />
        {/* <ErrorMessage as={<Error />} errors={errors} name="email">
          {({ message }) => <p>{message}</p>}
        </ErrorMessage> */}
        <FormsError errors={errors} name="email">
          {(message) => <p>{message}</p>}
        </FormsError>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register({
            required: "Password is required!",
            minLength: {
              value: 8,
              message:
                "Minimum length of password confirmation is 8 characters!",
            },
          })}
          type="password"
          name="password"
          className="form-control"
          id="password"
        />
        <ErrorMessage as={<Error />} errors={errors} name="password">
          {({ message }) => <p>{message}</p>}
        </ErrorMessage>
      </div>
      <button type="submit" className="btn btn-bwm-main">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
