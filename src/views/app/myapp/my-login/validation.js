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
    } else if (value.length < 2) {
      error = "Must be longer than 2 characters";
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
    } else if (value.some(tag => tag.length < 2)) {
       error = "Each skill must be longer than 2 characters";
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
  function validateLinkedinUrl(value) {
    let error;
  
    if (!value) {
      error = "Please provide your LinkedIn URL";
    } else if
      (!/^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9_-]+\/?$/i.test(value)) {
        error = "Invalid LinkedIn URL format";
    }
    return error;
  }
  
  function validateWhy(value) {
    let error;
    if (!value) {
      error = "This field is required.";
    }
    return error;
  }
  
  function validateWhat(value) {
    let error;
    if (!value) {
      error = "This field is required.";
    }
    return error;
  }
  
  function validateFile(value) {
    let error;
    if (!value) {
      error = "This field is required.";
    }
    //  else if (!["image/jpeg", "image/png"].includes(file.type)) {
    //   error = "Unsupported file type. Only JPEG and PNG images are allowed";
    // }
    return error;
  }
  export {
    validateLastName,
    validateEmail,
    validateFirstName,
    validatePassword,
    validateCategory,
    validateLocation,
    validateCompany,
    validateJobTitle,
    validateSkills,
    validateBio,
    validateLinkedinUrl,
    validateWhy,
    validateWhat,
    validateFile,
  };  