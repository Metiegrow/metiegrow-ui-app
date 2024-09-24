// ListingFieldValidation.js
const validateTitle = (value) => {
  let error;
  if (value === "") {
    error = "Please enter your title";
  }
  return error;
};
const validateDescription = (value) => {
  let error;
  if (value === "") {
    error = "Please enter your description";
  }
  return error;
};
export { validateDescription, validateTitle };
