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
function validateIdentityStatus(value) {
  let error;
  if (!value) {
    error = "Please select a identity status";
  }
  return error;
}

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
function validateLanguages(value) {
  // let error;
  // if (!value || value.length === 0) {
  //    error = "Please specify a languages";
  // } else if (value.some(tag => tag.length < 2)) {
  //    error = "Each language must be longer than 2 characters";
  // }
  // return error;
  let error;
  if (!value) {
    error = "Please select a languages";
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
function validateSkills(value) {
  let error;
  if (!value || value.length === 0) {
    error = "Please specify a skill";
  } else if (value.some((tag) => tag.length < 2)) {
    error = "Each skill must be longer than 2 characters";
  }
  return error;
}
function validateTopics(value) {
  let error;
  if (!value || value.length === 0) {
    error = "Please specify a topic";
  } else if (value.some((tag) => tag.length < 2)) {
    error = "Each topic must be longer than 2 characters";
  }
  return error;
}
function validateBio(value) {
  let error;
  if (!value) {
    error = "Please provide a bio";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }
  return error;
}

function validatePackageTopic(value) {
  let error;
  if (!value) {
    error = "Please provide a topic";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }
  return error;
}
function validateAbout(value) {
  let error;
  if (!value) {
    error = "Please provide a about";
  } else if (value.length < 2) {
    error = "Must be longer than 2 characters";
  }
  return error;
}
function validatePackageDescription(value) {
  let error;
  if (!value) {
    error = "Please provide a service descripiton";
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
function validateFile(value) {
  let error;

  if (!value) {
    error = "This field is required.";
  } else {
    const fileType = value.type;
    if (!["image/jpeg", "image/png"].includes(fileType)) {
      error = "Unsupported file type. Only JPEG and PNG images are allowed";
    }
  }

  return error;
}
function validatePackageTitle(value) {
  let error;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}
function validatePackageAmount(value) {
  let error;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}
function validateServiceName(value) {
  let error;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}
function validateServiceDescription(value) {
  let error;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}
export {
  validateAbout,
  validateAchievement,
  validateBio,
  validateCategory,
  validateCompany,
  validateEmail,
  validateFile,
  validateFirstName,
  validateIdentityStatus,
  validateJobTitle,
  validateLanguages,
  validateLastName,
  validateLinkedinUrl,
  validateLocation,
  validatePackageAmount,
  validatePackageDescription,
  validatePackageTitle,
  validatePackageTopic,
  validatePassword,
  validateReasonForMentor,
  validateServiceDescription,
  validateServiceName,
  validateSkills,
  validateTopics,
};
