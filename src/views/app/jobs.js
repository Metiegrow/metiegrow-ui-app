/* eslint-disable */

import React, { Component } from 'react';
import { Row, Button,Table } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { jobService } from 'services/jobservice';
import { withRouter } from 'react-router-dom';



class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = { elements: [] };
    }
    async componentDidMount() {
        this.getJobsList();
    }
    
    async getJobsList () {
        jobService.getJob()
        .then(response => {
            if (response?.data) {
                this.setState({ elements: response.data.data });
            }
        })
        .catch((error) => error);
    }

    handleDelete = (index) => {
        console.log("delete column id is ",index);
        jobService.deleteJob(index)
        .then(response => {
            const jobObj=response.data;
            if (response?.data?.status === 'S001') {
                this.getJobsList();
            }
        })
        .catch((error) => error);
        
    }  

    handleEdit = (index) => {
        let url='/app/edit-jobs/'+index;
        this.props.history.push(url)
    }  

 
    onClick = () => {
        console.log("Add Job Clicked");
        this.props.history.push('/app/create-jobs')
    };
  
    render() {
        return (
            <Row className="h-100">
                <Colxx xxs="12" md="10" className="mx-auto my-auto">
                    <Button color="secondary" size="lg" onClick={() => this.onClick()} style={{float:"right"}}>Add Job</Button>
                    <div style={{marginTop:"50px"}}>
                        <Separator className="mb-5" />
                    </div>
                </Colxx>
                <Colxx xxs="12" className="mb-4">
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Hours Per Day</th>
                                <th>Payment Per Day</th>
                                <th>Conditions</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.elements.map(({ id, title, startDate, endDate,hoursPerDay,paymentPerDay,conditions }) => (
                            <tr key={id}>
                                <td>{title}</td>
                                <td>{startDate}</td>
                                <td>{endDate}</td>
                                <td>{hoursPerDay}</td>
                                <td>{paymentPerDay}</td>
                                <td>{conditions}</td>
                                <td><Button color='primary' onClick={() => this.handleEdit(id)}>Edit</Button></td>
                                <td><Button color='danger' onClick={() => this.handleDelete(id)}>Delete</Button></td>

                            </tr>
                        ))}
                        </tbody>
                        </Table>
                    </Colxx>
            </Row>
        );
    }
};
export default withRouter(Jobs);
