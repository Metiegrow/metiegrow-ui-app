import { Colxx } from 'components/common/CustomBootstrap';
import React from 'react';
import { Button, Card,CardBody,Row, Pagination,
  PaginationItem,
  PaginationLink, } from 'reactstrap';


const LawQuestionAnswer = () => {
  return (
    <div>
    <Row>
      <Colxx>
      <h1 className='text-center text-large w-100 py-2'>Lawyer questions and answers</h1>
      <div>
      <div className='mt-2'>
      <div className='d-flex justify-content-between'>
      <h2 className='font-weight-semibold'>Questions</h2>
      <Button color="primary" className=''>Recent</Button>
      </div>
      
        <h3 className=''>view all 10 questions</h3>
      
        
      </div>
         <Card className='mt-3'>
          <CardBody>
           <div className=''>
           <div className='d-flex justify-content-between'>
           <h3>Question 1</h3>
            <h3>Date and year</h3>
           </div>
            
            <hr/>
           </div>
           <div className=''>
           <div className='d-flex justify-content-between'>
           <h3>Question 2</h3>
            <h3>Date and year</h3>
           </div>
           <hr/>
           </div>
           <div className=''>
           <div className='d-flex justify-content-between'>
           <h3>Question 3</h3>
            <h3>Date and year</h3>
           </div>
           <hr/>
           </div>
          </CardBody>
         </Card>
         <Row>
        <Colxx xxs="12" >
         <div  className=' '>
         <Pagination aria-label="Page navigation example"  listClassName="justify-content-center my-2">
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
         </div>
        
        </Colxx>
      </Row>
      </div>
      </Colxx>
    </Row>
    <hr/>
    <Row>
      <Colxx>
      <div>
      <div className='mt-4'>
      <div className='d-flex justify-content-between'>
      <h2 className='font-weight-semibold'>Answers</h2>
      <Button color="primary">Recent</Button>
      </div>
      
        <h3>view all 10 answers</h3>
        
      </div>
         <Card className='mt-3'>
          <CardBody>
           <div className=''>
           <div className='d-flex justify-content-between'>
           <h3>Answer 1</h3>
            <h3>Date and year</h3>
           </div>
            
            <hr/>
           </div>
           <div className=''>
           <div className='d-flex justify-content-between'>
           <h3>Answer 2</h3>
            <h3>Date and year</h3>
           </div>
           <hr/>
           </div>
           <div className=''>
           <div className='d-flex justify-content-between'>
           <h3>Answer 3</h3>
            <h3>Date and year</h3>
           </div>
           <hr/>
           </div>
          </CardBody>
         </Card>
         <Row>
        <Colxx xxs="12" >
         <div  className=' '>
         <Pagination aria-label="Page navigation example"  listClassName="justify-content-center my-2">
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
         </div>
        
        </Colxx>
      </Row>
      </div>
      </Colxx>
    </Row>
    </div>
  );
}

export default LawQuestionAnswer;
