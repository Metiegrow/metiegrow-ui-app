/* eslint-disable */

import React, { Component } from 'react';
import { Row, Button,Label, Form,FormGroup,Input } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { jobService } from 'services/jobservice';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'helpers/IntlMessages';



class EditJobPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                        id:{},
                        title: {} ,
                        startDate:{},
                        endDate:{},
                        hoursPerDay:{},
                        paymentPerDay:{},
                        conditions:{},
                        status:{},
                     };
    }

    
    async componentDidMount() {
        const res = async () => {
            const id = this.props.match.params.id;
            jobService.getJobById(id)
            .then(response => {
                if (response?.data) {
                    this.setState({
                        id:response.data.data.id,
                        title: response.data.data.title,
                        startDate:response.data.data.startDate,
                        endDate:response.data.data.endDate,
                        hoursPerDay:response.data.data.hoursPerDay,
                        paymentPerDay:response.data.data.paymentPerDay,
                        conditions:response.data.data.conditions,
                        status:response.data.data.status
                    });
                }
            })
            .catch((error) => error);
        };
        res();
      }


 
    onClickBtn = () => {
        console.log("Edit Job Clicked");
        console.log(this.state);
        const bodyData=JSON.stringify({
            "id":this.state.id,
            "title": this.state.title,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate,
            "hoursPerDay": this.state.hoursPerDay,
            "paymentPerDay":this.state.paymentPerDay,
            "conditions":this.state.conditions,
            "status":this.state.status
        });
        jobService.editJob(bodyData)
        .then(response => {
            const jobObj=response.data;
            if (response?.data) {
                // console.log(jobObj);
                history.push('/app/jobs');
            }
        })
        .catch((error) => error);
    };
  
    render() {
        return (
            <Row className="h-100">
                <Colxx xxs="12" md="10" className="mx-auto my-auto">
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
                                    <Input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})} />
                                </FormGroup>
                            </Colxx>
                            <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="job.startDate" />
                                    </Label>
                                    <Input type="date" value={this.state.startDate} onChange={e => this.setState({startDate: e.target.value})} />
                            </FormGroup>   
                            </Colxx>   
                        </Row>
                        <Row>
                            <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="job.endDate" />
                                    </Label>
                                    <Input type="date" value={this.state.endDate} onChange={e => this.setState({endDate: e.target.value})} />
                                </FormGroup>
                            </Colxx>
                            <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="job.hpd" />
                                    </Label>
                                    <Input type="number" value={this.state.hoursPerDay} onChange={e => this.setState({hoursPerDay: e.target.value})} />
                                </FormGroup>   
                            </Colxx>   
                        </Row>
                        <Row>
                            <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="job.ppd" />
                                    </Label>
                                    <Input type="number" value={this.state.paymentPerDay} onChange={e => this.setState({paymentPerDay: e.target.value})} />
                                </FormGroup>
                            </Colxx>
                            <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                    <IntlMessages id="job.conditions" />
                                    </Label>
                                    <Input type="text" value={this.state.conditions} onChange={e => this.setState({conditions: e.target.value})} />
                                </FormGroup>   
                            </Colxx>   
                        </Row>
                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                            color="primary"
                            size="lg"
                            onClick={() => this.onClickBtn()}
                            >
                            <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                            </span>
                            <span className="label">
                                <IntlMessages id="job.edit" />
                            </span>
                            </Button>
                        </div>
                    </Form>
                </Colxx>
            </Row>
        );
    }
};
export default withRouter(EditJobPage);
