import React from 'react';
import EducationalInformation from './educational-information';
import PersonalInformation from './personal-information';
import ProfessinalInformation from './professional-information';
// import InputEducationalInformation from './input/educationalInformation-input';
// import InputProfessionalInformation from './input/professionalInformation-input';
// import InputPersonalInformation from './input/personalInformation-input';

const MyDetails = () => {
  return (
    <div>
      <h1>MyDetails</h1>
      <EducationalInformation />
      {/* <InputEducationalInformation /> */}
      <ProfessinalInformation />
      {/* <InputProfessionalInformation /> */}
      <PersonalInformation />
      {/* <InputPersonalInformation /> */}
      {/* <ul>
        <li></li>
        <li></li>
        <br />
        <li></li>
        <li></li>
        <br />
        <li></li>
        <li></li>
        <br />
      </ul> */}
    </div>
  );
};

export default MyDetails;
