import "./formik-demo.css";
import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
// Helper for the demo
import { DisplayFormikState } from "./formik-demo";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required("Last name is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!")
  }),

  mapPropsToValues: ({ user }) => ({
    ...user
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", payload })
    });
    alert(payload.email);
    setSubmitting(false);
  },
  displayName: "MyForm"
});

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const TextInput = ({
  type,
  name,
  id,
  placeholder,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "input-group",
    {
      "animated shake error": !!error
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        name={name}
        id={id}
        className="text-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="firstName"
        id="firstName"
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        error={touched.firstName && errors.firstName}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        name="lastName"
        id="lastName"
        type="text"
        label="Last Name"
        placeholder="Enter your last name"
        error={touched.lastName && errors.lastName}
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        name="email"
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email address"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {/* <DisplayFormikState {...props} /> */}
    </form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const Form = () => (
  <div className="app">
    {/* <h1>
      Building input to use in Gatsby and submit to Netlify{" "}
      <a href="https://github.com/jaredpalmer/formik">Formik</a>
    </h1>
    <p>
      Formik's enables you to quickly build and style your own reusable
      form-related components extremely quickly.
    </p>
    <p>
      This example is a fork from Jared Palmer that uses styled components and
      sets up to submit to Netlify. It demonstrates a custom text input, label,
      and form feedback components as well as a cool shake animation that's
      triggered if a field is invalid.
    </p> */}

    <MyEnhancedForm user={{ email: "", firstName: "", lastName: "" }} />
  </div>
);

export default Form