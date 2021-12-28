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
              This is not a valid date. (yyy-mm-dd)
          </div>
      );
  }
};
export const vtimestamp = value => {
  if (value.length != 19 || isNaN(Date.parse(value, "yyyy/MM/dd HH:mm:ss"))) {
      return (
          <div className="alert alert-danger" role="alert">
              This is not a valid timestamp.  (yyyy-mm-dd hh:mm:ss)
          </div>
      );
  }
};