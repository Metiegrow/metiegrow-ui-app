import React, { useState } from 'react';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Form, Input, Button } from 'antd';

import CompanyRequirterForm from './CompanyRequirterForm';
import FreelanceInfoForm from './FreelanceInfoForm';

const RegisterForm = () => {
  const [employmentType, setEmploymentType] = useState('');
  const [showNextComponent, setShowNextComponent] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = () => {
    const errors = {};

    const fullName = document.querySelector('[name="fullName"]').value.trim();
    const mobile = document.querySelector('[name="mobile"]').value.trim();
    const email = document.querySelector('[name="email"]').value.trim();
    const password = document.querySelector('[name="password"]').value.trim();
    const confirmPassword = document.querySelector('[name="confirmPassword"]').value.trim();

    if (!fullName) errors.fullName = 'Full name is required.';
    if (!mobile) {
      errors.mobile = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      errors.mobile = 'Enter valid 10-digit Indian mobile number.';
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!employmentType) errors.employmentType = 'Please select an employment type.';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setShowNextComponent(true);
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#000000] flex justify-center px-4 overflow-y-auto pt-10'>
      <div className='w-[350px] pb-12'>
        {!showNextComponent ? (
          <>
            <div className='mb-6'>
              <Button type='text' className='bg-transparent pl-0'>
                <BackButtonIcon className='w-5 h-5' />
              </Button>
            </div>

            <Form layout='vertical' className='space-y-4'>
              <Form.Item
                name='fullName'
                label={
                  <span className='text-white'>
                    Full Name <span className='text-red-500'>*</span>
                  </span>
                }
              >
                <Input
                  name='fullName'
                  placeholder='Enter Name'
                  className='h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4'
                />
                {formErrors.fullName && (
                  <p className='text-red-500 text-xs mt-1 ml-2'>{formErrors.fullName}</p>
                )}
              </Form.Item>

              <Form.Item
                name='mobile'
                label={
                  <span className='text-white'>
                    Mobile Number <span className='text-red-500'>*</span>
                  </span>
                }
              >
                <div className='w-full h-[51px] flex items-center border border-[#646464] rounded-[24px] overflow-hidden'>
                  <div className='bg-[#232323] w-[32px] h-[86px] rounded-[24px] flex items-center justify-center text-white text-xs px-2 ml-2'>
                    <span className='text-white ml-2'>+91</span>
                  </div>
                  <Input
                    name='mobile'
                    placeholder='9999 999 999'
                    className='flex-1 h-full bg-transparent text-white placeholder-gray-500 border-none focus:ring-0 px-2'
                  />
                </div>
                {formErrors.mobile && (
                  <p className='text-red-500 text-xs mt-1 ml-2'>{formErrors.mobile}</p>
                )}
              </Form.Item>

              <Form.Item name='email' label={<span className='text-white'>Email Address</span>}>
                <Input
                  name='email'
                  placeholder='Enter Email Address'
                  className='h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4'
                />
                {formErrors.email && (
                  <p className='text-red-500 text-xs mt-1 ml-2'>{formErrors.email}</p>
                )}
              </Form.Item>

              <Form.Item name='password' label={<span className='text-white'>Password</span>}>
                <Input
                  name='password'
                  type='password'
                  placeholder='********'
                  className='h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4'
                />
                {formErrors.password && (
                  <p className='text-red-500 text-xs mt-1 ml-2'>{formErrors.password}</p>
                )}
              </Form.Item>

              <Form.Item
                name='confirmPassword'
                label={<span className='text-white'>Confirm Password</span>}
              >
                <Input
                  name='confirmPassword'
                  type='password'
                  placeholder='********'
                  className='h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4'
                />
                {formErrors.confirmPassword && (
                  <p className='text-red-500 text-xs mt-1 ml-2'>{formErrors.confirmPassword}</p>
                )}
              </Form.Item>

              <Form.Item
                name='employmentType'
                label={<span className='text-white font-semibold'>Employment Type</span>}
              >
                <div className='flex flex-col space-y-5'>
                  {['Individual/Freelancer', 'Company Requirer', 'Consulting agency'].map(
                    (type) => (
                      <label key={type} className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='radio'
                          name='employmentType'
                          value={type}
                          checked={employmentType === type}
                          onChange={(e) => setEmploymentType(e.target.value)}
                          className='sr-only'
                        />
                        <div
                          className='w-5 h-5 rounded-full flex items-center justify-center'
                          style={{
                            border: '2px solid',
                            borderColor: employmentType === type ? '#50FFB9' : '#646464',
                          }}
                        >
                          {employmentType === type && (
                            <div
                              className='w-[10px] h-[10px] rounded-full'
                              style={{ backgroundColor: '#50FFB9' }}
                            />
                          )}
                        </div>
                        <span className='text-[#B0B0B0] text-[15px]'>{type}</span>
                      </label>
                    )
                  )}
                </div>
                {formErrors.employmentType && (
                  <p className='text-red-500 text-xs mt-1 ml-2'>{formErrors.employmentType}</p>
                )}
              </Form.Item>

              <Form.Item className='mt-8'>
                <Button
                  type='primary'
                  onClick={handleSubmit}
                  className='w-[350px] h-[56px] rounded-[49px] bg-[#BC5FFF] border-none text-white font-semibold'
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            {employmentType === 'Individual/Freelancer' && <FreelanceInfoForm />}
            {employmentType === 'Company Requirer' && <CompanyRequirterForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;

// import React, { useState } from 'react';
// import { BackButtonIcon } from '../Components/Common/SVG/svg.function';
// import { Form, Input, Button } from 'antd';

// import CompanyRequirterForm from './CompanyRequirterForm';
// import FreelanceInfoForm from './FreelanceInfoForm';

// const RegisterForm = () => {
//   const [employmentType, setEmploymentType] = useState('');
//   const [showNextComponent, setShowNextComponent] = useState(false);

//   const handleSubmit = () => {
//     if (!employmentType) {
//       alert("Please select an employment type.");
//       return;
//     }
//     setShowNextComponent(true);
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#000000] flex justify-center px-4 overflow-y-auto pt-10">
//       <div className="w-[350px] pb-12">
//         {/* Show Form */}
//         {!showNextComponent ? (
//           <>
//             {/* Back Button */}
//             <div className="mb-6">
//               <Button type="text" className="bg-transparent pl-0">
//                 <BackButtonIcon className="w-5 h-5" />
//               </Button>
//             </div>

//             <Form layout="vertical" className="space-y-4">
//               <Form.Item
//                 name="fullName"
//                 label={<span className="text-white">Full Name <span className="text-red-500">*</span></span>}
//               >
//                 <Input
//                   placeholder="Enter Name"
//                   className="h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="mobile"
//                 label={<span className="text-white">Mobile Number <span className="text-red-500">*</span></span>}
//               >
//                 <div className="w-full h-[51px] flex items-center border border-[#646464] rounded-[24px] overflow-hidden">
//                   <div className="bg-[#232323] w-[32px] h-[86px] rounded-[24px] flex items-center justify-center text-white text-xs px-2 ml-2">
//                     <span className="text-white ml-2">+91</span>

//                   </div>

//                   <Input
//                     placeholder="9999 999 999"
//                     className="flex-1 h-full bg-transparent text-white placeholder-gray-500 border-none focus:ring-0 px-2"
//                   />
//                 </div>
//               </Form.Item>

//               <Form.Item
//                 name="email"
//                 label={<span className="text-white">Email Address</span>}
//               >
//                 <Input
//                   placeholder="Enter Email Address"
//                   className="h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="password"
//                 label={<span className="text-white">Password</span>}
//               >
//                 <Input
//                   placeholder="********"
//                   className="h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="confirmPassword"
//                 label={<span className="text-white">Confirm Password</span>}
//               >
//                 <Input
//                   placeholder="********"
//                   className="h-[51px] bg-transparent text-white placeholder-gray-500 border border-[#646464] rounded-[24px] px-4"
//                 />
//               </Form.Item>

//               {/* Employment Type */}
//               <Form.Item
//                 name="employmentType"
//                 label={<span className="text-white font-semibold">Employment Type</span>}
//               >
//                 <div className="flex flex-col space-y-5">
//                   {['Individual/Freelancer', 'Company Requirer', 'Consulting agency'].map((type) => (
//                     <label
//                       key={type}
//                       className="flex items-center gap-3 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name="employmentType"
//                         value={type}
//                         checked={employmentType === type}
//                         onChange={(e) => setEmploymentType(e.target.value)}
//                         className="sr-only"
//                       />
//                       <div
//                         className="w-5 h-5 rounded-full flex items-center justify-center"
//                         style={{
//                           border: '2px solid',
//                           borderColor: employmentType === type ? '#50FFB9' : '#646464',
//                         }}
//                       >
//                         {employmentType === type && (
//                           <div
//                             className="w-[10px] h-[10px] rounded-full"
//                             style={{ backgroundColor: '#50FFB9' }}
//                           />
//                         )}
//                       </div>
//                       <span className="text-[#B0B0B0] text-[15px]">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </Form.Item>

//               {/* Submit Button */}
//               <Form.Item className="mt-8">
//                 <Button
//                   type="primary"
//                   onClick={handleSubmit}
//                   className="w-[350px] h-[56px] rounded-[49px] bg-[#BC5FFF] border-none text-white font-semibold"
//                 >
//                   Continue
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         ) : (
//           <>
//             {employmentType === 'Individual/Freelancer' && <FreelanceInfoForm />}
//             {employmentType === 'Company Requirer' && <CompanyRequirterForm />}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
