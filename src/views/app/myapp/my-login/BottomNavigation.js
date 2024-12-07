// /* eslint-disable no-param-reassign */
// import React from "react";
// import {
//   Button,
// } from "reactstrap";
// import {WithWizard } from "react-albus";

// const BottomNavigation = ({
//     className,
//     onClickPrev,
//     prevLabel,
//     onClickNext,
//     // nextLabel,
//   }) => {
//     return (
//       <WithWizard
//         render={({ next, previous, step, steps }) => {
//           if (steps.indexOf(step) === 3) {
//             return null;
//           }

//           return (
//             <div className={`wizard-buttons ${className}`}>
//               {steps.indexOf(step) > 0 && (
//                 <div className="position-relative w-100 h-100">
//                   <Button
//                     color="primary"
//                     outline
//                     className={`mr-1 ${
//                       steps.indexOf(step) <= 0 ? "disabled" : ""
//                     }`}
//                     onClick={() => {
//                       onClickPrev(previous, steps, step);
//                     }}
//                   >
//                     {prevLabel}
//                   </Button>
//                 </div>
//               )}
//               <div>
//                 <Button
//                   color="primary"
//                   className={`${
//                     steps.indexOf(step) >= steps.length - 1 ? "disabled" : ""
//                   } text-nowrap  ml-2`}
//                   onClick={() => {
//                     onClickNext(next, steps, step);
//                   }}
//                 >
//                   {/* {nextLabel} */}
//                   {steps.indexOf(step) === 2 ? "Submit" : "Next Step"}
//                 </Button>
//               </div>
//             </div>
//           );
//         }}
//       />
//     );
//   };

//   export default BottomNavigation;

/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from "react";
import { WithWizard } from "react-albus";
import { Button } from "reactstrap";



const BottomNavigation = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
  licenseBalance
}) => {
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <div className={`wizard-buttons ${className}`}>
          {/* {steps.indexOf(step) < steps.length - 1 && (
            <Button
              color="primary"
              className='mr-1'
              onClick={() => {
                onClickPrev(previous, steps, step);
              }}
            >
              {prevLabel}
            </Button>
          )} */}
          {step !== steps[0] && step !== steps[steps.length - 1] && (
            <Button
              color="primary"
              className="mr-1"
              onClick={() => {
                onClickPrev(previous, steps, step);
              }}
            >
              {prevLabel}
            </Button>
          )}

          {steps.indexOf(step) < steps.length - 1 && (
            <Button
              color="primary"
              className="ml-1"
              onClick={() => {
                onClickNext(next, steps, step);
              }}
              disabled={step.id === 'step2' && !licenseBalance}
            >
              {nextLabel}
            </Button>
          )}
        </div>
      )}
    />
  );
};

export default BottomNavigation;


