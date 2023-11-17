/* eslint-disable */
import React, { useState} from 'react';
import { Row, Button,Label, Form,FormGroup,Input } from 'reactstrap';
import { Colxx,Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { withRouter,useHistory } from 'react-router-dom';
import { jobService } from 'services/jobservice';



const CreateJobPage = (props) => {

    console.log(props)
    const [title,Setemail] = useState('');
    const [startDate,SetstartDate] = useState('');
    const [endDate,SetendDate] = useState('');
    const [hoursPerDay,SethoursPerDay] = useState('');
    const [paymentPerDay,SetpaymentPerDay] = useState('');
    const [conditions,Setconditions] = useState('');

    // let history = useHistory()
    
    const onClickBtn = () => {
        const bodyData=JSON.stringify({
            "title": title,
            "startDate": startDate,
            "endDate": endDate,
            "hoursPerDay": hoursPerDay,
            "paymentPerDay":paymentPerDay,
            "conditions":conditions
        });
        jobService.addJob(bodyData)
        .then(response => {
            // console.log('Response : ',response?.data?.status)
            if (response.data?.status === 'S001') {
                props.history.push('/app/jobs');
            }
        })
        .catch((error) => error);
    };

  
    
    return (
        <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <h6>Create Job</h6>
                <div style={{marginTop:"50px"}}>
                    <Separator className="mb-5" />
                </div>
            </Colxx>
            <Colxx xxs="12" className="mx-auto my-auto">
            
            <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                    <Colxx xxs="6">
                        <FormGroup className="form-group has-float-label">
                            <Label>
                            <IntlMessages id="job.title" />
                            </Label>
                            <Input type="text" onChange={e => Setemail(e.target.value)} />
                        </FormGroup>
                    </Colxx>
                    <Colxx xxs="6">
                        <FormGroup className="form-group has-float-label">
                            <Label>
                            <IntlMessages id="job.startDate" />
                            </Label>
                            <Input type="date" onChange={e => SetstartDate(e.target.value)} />
                        </FormGroup>   
                    </Colxx>   
                </Row>
                <Row>
                    <Colxx xxs="6">
                        <FormGroup className="form-group has-float-label">
                            <Label>
                            <IntlMessages id="job.endDate" />
                            </Label>
                            <Input type="date" onChange={e => SetendDate(e.target.value)} />
                        </FormGroup>
                    </Colxx>
                    <Colxx xxs="6">
                        <FormGroup className="form-group has-float-label">
                            <Label>
                            <IntlMessages id="job.hpd" />
                            </Label>
                            <Input type="number" onChange={e => SethoursPerDay(e.target.value)} />
                        </FormGroup>   
                    </Colxx>   
                </Row>
                <Row>
                    <Colxx xxs="6">
                        <FormGroup className="form-group has-float-label">
                            <Label>
                            <IntlMessages id="job.ppd" />
                            </Label>
                            <Input type="number" onChange={e => SetpaymentPerDay(e.target.value)} />
                        </FormGroup>
                    </Colxx>
                    <Colxx xxs="6">
                        <FormGroup className="form-group has-float-label">
                            <Label>
                            <IntlMessages id="job.conditions" />
                            </Label>
                            <Input type="text" onChange={e => Setconditions(e.target.value)} />
                        </FormGroup>   
                    </Colxx>   
                </Row>
                
                <div className="d-flex justify-content-between align-items-center">
                    <Button
                    color="primary"
                    size="lg"
                    onClick={() => onClickBtn()}
                    >
                    <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                    </span>
                    <span className="label">
                        <IntlMessages id="job.create" />
                    </span>
                    </Button>
                </div>
            </Form>
            </Colxx>
        </Row>
    );
   
};
export default withRouter(CreateJobPage);
