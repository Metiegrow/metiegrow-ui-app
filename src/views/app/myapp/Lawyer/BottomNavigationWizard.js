/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import React from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'reactstrap';


const  BottomNavigationWizard = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
  paymentButtonType,
  packageId,
  lawyerId
}) => {

  const handlePayFromWallet = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/lawyer/${lawyerId}/service/${packageId}/purchase`, {
        paymentMethod: 'WALLET'
      });
      console.log('Payment success:', response.data);
      // Handle success response here
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle error here
    }
  };
  // const handlePayFromOnline = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}/api/lawyer/${lawyerId}/service/${packageId}/purchase`, {
  //       paymentMethod: 'ONLINE'
  //     });
  //     console.log('Payment success:', response.data);
  //     // Handle success response here
  //   } catch (error) {
  //     console.error('Payment failed:', error);
  //     // Handle error here
  //   }
  // };
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        
        <div className={`wizard-buttons ${className}`}>
          <Button
            color="primary"
            className={`mr-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
            onClick={() => {
              onClickPrev(previous, steps, step);
            }}
          >
            {prevLabel}
          </Button>

          <Button
            color="primary"
            className={
              // steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''
              steps.indexOf(step) <=1  ? 'd-none' : ''
            }
            onClick={() => {
              onClickNext(next, steps, step);
            }}
          >
            {nextLabel}
          </Button>
         
    


            <Button 
            color='primary'
            className={steps.indexOf(step) === 0 ? '' : 'd-none'}
            onClick={() => {
              onClickNext(next, steps, step);
            }}
          >
            pay from wallet
          </Button>


          <Button 
            color='primary'
            className={steps.indexOf(step) === 1 ? '' : 'd-none'}
            onClick={() => {
              onClickNext(next, steps, step);
              if (paymentButtonType === 'payFromWallet') {
                handlePayFromWallet();
              }
              // else{
              //   handlePayFromOnline();
              // }
              
            }}
          >
            {paymentButtonType === 'payFromWallet' ? 'Pay from Wallet' : 'Pay remaining online'}
          </Button>


          
        </div>
      )}
    />
  );
};
export default BottomNavigationWizard;
