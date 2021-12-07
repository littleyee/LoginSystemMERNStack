//import { isEmail, isDate} from "validator";

export const vfirstName = value => {
  if (value.length < 2 || value.length > 40) {
      return (
          <div className="alert alert-danger" role="alert">
              The first name must be between 2 and 40 characters.
          </div>
      );
  }
};

export const vlastName = value => {
  if (value.length < 2 || value.length > 40) {
      return (
          <div className="alert alert-danger" role="alert">
              The last name must be between 2 and 40 characters.
          </div>
      );
  }
};

export const vaddress = value => {
  if (value.length < 2 || value.length > 40) {
      return (
          <div className="alert alert-danger" role="alert">
              The address must be between 2 and 40 characters.
          </div>
      );
  }
};

export const vcity = value => {
  if (value.length < 2 || value.length > 40) {
      return (
          <div className="alert alert-danger" role="alert">
              The city must be between 2 and 40 characters.
          </div>
      );
  }
};


export const vzip = value => {
  const zipletters = /^([0-9]{5})$/;
  if (!zipletters.test(value) || value.toString().length !== 5) {
      return (
          <div className="alert alert-danger" role="alert">
              The zip must all numbers and 5 characters.
          </div>
      );
  }
};