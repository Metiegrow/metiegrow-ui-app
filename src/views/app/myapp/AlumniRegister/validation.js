// import react from "react";

const validateFirstName = (value) => {
  let error;
  if (!value) {
    error = "Please enter your first name";
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    error = "Only alphabets are allowed";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }

  return error;
};

const validateLastName = (value) => {
  let error;
  if (!value) {
    error = "Please enter your first name";
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    error = "Only alphabets are allowed";
  } else if (value.length < 1) {
    error = "Must be longer than 1 characters";
  }

  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please choose a password";
  } else if (value.length < 6) {
    error = "Password must be longer than 6 characters";
  }
  return error;
};
function validateCategory(value) {
  let error;
  if (!value) {
    error = "Please select a category";
  }
  return error;
}
function validateLocation(value) {
  let error;
  if (!value) {
    error = "Please select a location";
  }
  return error;
}
function validateDomain(value) {
  let error;
  if (!value) {
    error = "Please select a domain";
  }
  return error;
}
function validateIdentityStatus(value) {
  let error;
  if (!value) {
    error = "Please select a identity status";
  }
  return error;
}
function validateCompany(value) {
  let error;
  if (!value) {
    error = "Please provide the company name";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }
  return error;
}

function validateJobTitle(value) {
  let error;
  if (!value) {
    error = "Please enter a job title";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }
  return error;
}
// function validateSkills(value) {
//   let error;
//   if (!value) {
//     error = "Please specify a skill";
//   } else if (value.length < 2) {
//       error = "Must be longer than 2 characters";
//     }
//   return error;
// }
// function validateSkills(value) {
//   let error;
//   if (!value || value.length === 0) {
//      error = "Please specify a skill";
//   } else if (value.some(tag => tag.length < 2)) {
//      error = "Each skill must be longer than 2 characters";
//   }
//   return error;
//  }

const validateSkills = (value) => {
  if (!Array.isArray(value)) {
    return "Skills must be an array of strings";
  }

  if (value.length === 0) {
    return "Please add at least one skill";
  }

  const isString = value.every((skill) => typeof skill === "string");
  if (!isString) {
    return "Skills must be strings";
  }

  return null;
};

function validateBio(value) {
  let error;
  if (!value) {
    error = "Please provide a bio";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }
  return error;
}
function validateLinkedinUrl(value) {
  let error;

  if (!value) {
    error = "Please provide your LinkedIn URL";
  } else if (
    !/^https?:\/\/(?:www\.)?linkedin\.com\/(?:[a-z]{2,3}\.)?in\/[a-zA-Z0-9_-]+\/?$/i.test(
      value
    )
  ) {
    error = "Invalid LinkedIn URL format";
  }
  return error;
}

// function validateLinkedinUrl(value) {
//   let error;

//   if (!value) {
//       error = "Please provide your LinkedIn URL";
//   } else if (!/^linkedin\.(com|in)\/(in|pub|profile|company)\/[a-zA-Z0-9_-]+\/?$/i.test(value)) {
//       error = "Invalid LinkedIn URL format";
//   }
//   return error;
// }

function validateReasonForMentor(value) {
  let error;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}

function validateAchievement(value) {
  let error;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}

// function validateFile(value) {
//   let error;
//   if (!value) {
//     error = "This field is required.";
//   }
//   //  else if (!["image/jpeg", "image/png"].includes(file.type)) {
//   //   error = "Unsupported file type. Only JPEG and PNG images are allowed";
//   // }
//   return error;
// }
// function validateFile(value) {
//   let error;

//   if (!value) {
//     error = "This field is required.";
//   } else {
//     const fileType = value.type;
//     if (!["image/jpeg", "image/png"].includes(fileType)) {
//       error = "Unsupported file type. Only JPEG and PNG images are allowed";
//     }
//   }

//   return error;
// }
const validateFile = (value) => {
  let error;
  if (!value) {
    error = "Please select an image file";
  } else if (!value.type.startsWith("image/")) {
    error = "Please select a valid image file";
  }
  return error;
};

export {
  validateAchievement,
  validateBio,
  validateCategory,
  validateCompany,
  validateDomain,
  validateEmail,
  validateFile,
  validateFirstName,
  validateIdentityStatus,
  validateJobTitle,
  validateLastName,
  validateLinkedinUrl,
  validateLocation,
  validatePassword,
  validateReasonForMentor,
  validateSkills,
};
