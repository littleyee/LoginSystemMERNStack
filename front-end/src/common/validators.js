import { isEmail, isDate } from "validator";

export const vrequired = value => {
  if (!value) {
      return (
          <div className="alert alert-danger" role="alert">
              This field is required!
          </div>
      );
  }
};

export const vemail = value => {
  if (!isEmail(value)) {
      return (
          <div className="alert alert-danger" role="alert">
              This is not a valid email.
          </div>
      );
  }
};

export const vdate = value => {
  if (!isDate(value)) {
      return (
          <div className="alert alert-danger" role="alert">
              This is not a valid date.
          </div>
      );
  }
};