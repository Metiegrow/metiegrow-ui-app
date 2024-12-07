/* eslint-disable no-param-reassign */
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import { Card, CardBody, Form, FormGroup,  Label } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import TopNavigation from 'components/wizard/TopNavigation';
import { Colxx } from 'components/common/CustomBootstrap';

import BottomNavigationWizard from './BottomNavigationWizard';






const PaymentWizard = ({ intl }) => {


 
  const location = useLocation();
  
  const { firstName, lastName, serviceName ,amount,packageId ,lawyerId} = location.state || {};
 const [walletamount,setWalletAmount]=useState("")

  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const getWalletAmountUrl=`${baseUrl}/api/wallet/balance`

  useEffect(()=>{
    
    const WalletAmountGet=async()=>{
        try {
          
            const response = await axios.get(getWalletAmountUrl);
            
            setWalletAmount(response.data);
            console.log(response);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    WalletAmountGet();
  
},[getWalletAmountUrl])

const calculateBalanceAfterDeduction = () => {
  if (walletamount.balance !== null) {
    const balanceAfterDeduction = walletamount.balance - amount;
    return balanceAfterDeduction >= 0 ? balanceAfterDeduction : 0;
  }
  return null;
};

const calculateRemainingAmountToPay = () => {
  if (walletamount.balance !== null) {
    return amount - walletamount.balance >= 0 ? amount - walletamount.balance : 0;
  }
  return null;
};
  const { messages } = intl;
  return (
    <Colxx lg={6} mg={6} className='mx-auto'>
        <Card className='py-3'>
      <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav
            topNavClick={topNavClick}
          />
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc="payment"
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                   <div className=''>
                   <h2>You are purchasing the service <strong className=''>{serviceName}</strong></h2>
                     <h2> from the lawyer 
                     <strong> {firstName} {lastName}</strong></h2>
                   </div>
                  
                    
                  </FormGroup>

                 
                  <FormGroup className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Package Amount</Label>
                                    <Colxx lg={5} className=''>
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>₹{amount}</span></h3>
                                    </Colxx>
                                </div>
                            </FormGroup>
                            <FormGroup className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Wallet Balance</Label>
                                    <Colxx lg={5}>
                                     
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>₹{walletamount.balance}</span></h3>
                                    </Colxx>
                                </div>
                            </FormGroup>
                            
                            
                </Form>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['wizard.step-name-2']}
              desc="Pay from wallet"
            >
              <div className="wizard-basic-step">
              {walletamount.balance>amount?(
                <Form>
                <FormGroup className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Package Amount</Label>
                                    <Colxx lg={5} className=''>
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>₹{amount}</span></h3>
                                    </Colxx>
                                </div>
                            </FormGroup>
                            <FormGroup className='w-100'>
                            
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Wallet Balance</Label>
                                    <Colxx lg={5}>
                                     
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>₹{walletamount.balance}</span></h3>
                                    </Colxx>
                                </div>
                            </FormGroup>
                            <FormGroup className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Balance after deduction</Label>
                                    <Colxx lg={5}>
                                     
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>
                                        {calculateBalanceAfterDeduction() !== null ? `₹${calculateBalanceAfterDeduction()}` : 'Loading...'}</span></h3>
                                      
                                      
                                    </Colxx>
                                    
                                </div>
                               
                            </FormGroup>
                            <FormGroup>
                            <div>
                                  <h3 className='text-one text-muted'>Do you want to pay</h3>
                                </div>
                            </FormGroup>
                </Form>
              ):(
                <Form>
                <FormGroup className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Package Amount</Label>
                                    <Colxx lg={5} className=''>
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>₹{amount}</span></h3>
                                    </Colxx>
                                </div>
                            </FormGroup>
                            <FormGroup className='w-100'>
                            
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Your Wallet Balance</Label>
                                    <Colxx lg={5}>
                                     
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>₹{walletamount.balance}</span></h3>
                                    </Colxx>
                                </div>
                            </FormGroup>
                            <FormGroup className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Label className='text-one'>Remaining amount to pay</Label>
                                    <Colxx lg={5}>
                                     
                                        <h3 className=''><span className='font-weight-bold color-theme-1'>
                                        ₹{calculateRemainingAmountToPay() !== null ? calculateRemainingAmountToPay() : 'Loading...'}
                                       </span></h3>
                                      
                                      
                                    </Colxx>
                                    
                                </div>
                               
                            </FormGroup>
                            <FormGroup>
                            <div>
                                  <h3 className='text-one text-muted'>Do you want to pay</h3>
                                </div>
                            </FormGroup>
                </Form>
              )
              }
                
               
              </div>
            </Step>
            {/* <Step
              id="step3"
              name={messages['wizard.step-name-3']}
              desc={messages['wizard.step-desc-3']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>
                      sss
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder={messages['forms.password']}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </div>
            </Step> */}
            <Step id="step4" hideTopNav>
            <div className="wizard-basic-step text-center">
                <h2 className="mt-4">
                 
                Your Payment is successfull
                </h2>
                {/* <p>
                 
                  Thank you
                </p> */}
              </div>
            </Step>
          </Steps>
          <BottomNavigationWizard
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className="justify-content-center"
            prevLabel="Back"
            nextLabel="Next"
            packageId={packageId}
            lawyerId={lawyerId}
            paymentButtonType={walletamount.balance > amount ? 'payFromWallet' : 'payRemaining'}
/>
          
        </Wizard>
      </CardBody>
    </Card>
    </Colxx>
  
  );
};

export default injectIntl(PaymentWizard);
