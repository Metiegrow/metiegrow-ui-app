import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, Card,CardBody,Row, Pagination,
    PaginationItem,
    PaginationLink,
    NavLink, } from 'reactstrap';


 

const MyQandA = () => {
  const [myanswers,setMyAnswers]=useState('');
  const [myquestions,setMyQuestions]=useState('');
  const url=`${baseUrl}/mentor/myanswers`;
  const url1=`${baseUrl}/mentor/myquestions`;
  useEffect(()=>{
 const MyAnswers = async () => {
      try {
        const response = await axios.get(url);
        setMyAnswers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    MyAnswers();
    const MyQuestions = async () => {
      try {
        const response = await axios.get(url1);
        setMyQuestions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    MyQuestions();
  },[])

  return (
    <div>
    <Row>
      <Colxx>
      <h1 className='text-center text-large w-100 py-2'>My questions and answers</h1>
      <div>
      <div className='mt-2'>
      <div className='d-flex justify-content-between'>
      <h2 className='font-weight-semibold'>Questions</h2>
      <Button color="primary" className=''>Recent</Button>
      </div>
      {myquestions&&myquestions.map((num)=>{
         return(
          <div key={num.totalQuestions}>
          <h3>view all <span className='font-weight-semibold'>{num.totalQuestions}</span> Questions</h3>
      
          </div>
         )
        })}
        {/* <h3 className=''>view all 10 questions</h3> */}
      
        
      </div>
         {/* <Card className='mt-3'>
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
         </Card> */}
         <Card className='mt-3'>
          <CardBody>
           <div className=''>
           <div className=''>
           {myquestions&&myquestions.map((qs)=>{
              return (
                <div key={qs.totalAnswers}>
                  
                  <div className='' key={qs.totalAnswers}>
                {/* <h3>{ans.totalAnswers}</h3> */}
                <h3>{qs.questions.map((s)=>{
                  const qdate=new Date(s.timestamp);
                  const qsdateformat = `${qdate.getDate()}/${qdate.getMonth()+1}/${qdate.getFullYear()}`;
                  return (
                    <div key={s.questionId}>
                   
                      <div className='d-flex   justify-content-between'>
                      <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                      <h3>{s.question}</h3>
                      {/* <h3>{qdate.toLocaleString()}</h3> */}
                     
                      </NavLink>
                      <h3>{qsdateformat}</h3>
                     
                     
                      </div>
                     <hr/>
                    
                   
                    </div>
                  )
                })}</h3>
               
           </div>
                 
                </div>
              
              )
            })}
          
           </div>
          
            
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
      <Colxx xxs='12'>
      <div>
      <div className='mt-4'>
      <div className='d-flex justify-content-between'>
      <h2 className='font-weight-semibold'>Answers</h2>
      <Button color="primary">Recent</Button>
      </div>
        {myanswers&&myanswers.map((num)=>{
         return(
          <div key={num.totalAnswers}>
          <h3>view all <span className="font-weight-semibold">{num.totalAnswers}</span> answers</h3>
      
          </div>
         )
        })}
     
        
      </div>
         <Card className='mt-3'>
          <CardBody>
           <div className=''>
           <div className=''>
           {myanswers&&myanswers.map((ans)=>{
           
              return (
                
                <div key={ans.totalAnswers}>
                  
                  <div className='' key={ans.totalAnswers}>
                {/* <h3>{ans.totalAnswers}</h3> */}
                <h3>{ans.answers.map((s)=>{
                  const ansdate=new Date(s.timestamp);
                  const ansdateformat = `${ansdate.getDate()}/${ansdate.getMonth()+1}/${ansdate.getFullYear()}`;
                  return (
                    <div key={s.questionId}>
                   
                      <div className='d-flex   justify-content-between'>
                      <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                      <h3>{s.question}</h3>
                      {/* <h3>{qdate.toLocaleString()}</h3> */}
                     
                      </NavLink>
                      {/* <h3>{ansdate.toLocaleString()}</h3> */}
                      <h3>{ansdateformat}</h3>
                     
                     
                      </div>
                     <hr/>
                    
                   
                    </div>
                  )
                })}</h3>
               
           </div>
                 
                </div>
              
              )
            })}
          
           </div>
           {/* {myanswers&&myanswers.map((ans)=>{
              return (
                <div className='d-flex justify-content-between' key={ans.totalAnswers}>
                <h3>{ans.totalAnswers}</h3>
                <h3>{ans.answers.map((s)=>{
                  return (
                    <div key={s.questionId}>
                    <h3>{s.question}</h3>
                    </div>
                  )
                })}</h3>
                 
           </div>
              )
            })} */}
            {/* {myanswers.answers&&myanswers.answers.map((a)=>{
                  return (
                 <div key={a.questionId}>
                  <h2>hhhh:{a.questionId}</h2>
                 </div>
                  )
                })
                } */}
                
            {/* <hr/> */}
           </div>
           {/* <div className=''>
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
           </div> */}
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

export default MyQandA;
