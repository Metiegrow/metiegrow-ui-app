import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, Card,CardBody,Row,  NavLink, } from 'reactstrap';
 import Pagination from 'containers/pages/Pagination';




 

const MyQandA = () => {
  // const [myanswers,setMyAnswers]=useState('');
  // const [myquestions,setMyQuestions]=useState('');
  const[activities,setActivities]=useState('');
  // const url=`${baseUrl}/mentor/myanswers`;
  // const url1=`${baseUrl}/mentor/myquestions`;
  const url2=`${baseUrl}/myActivities`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage] = useState(5);
 
 

  useEffect(()=>{
//  const MyAnswers = async () => {
//       try {
//         // const response = await axios.get(`${url}?_page=${currentPage}&_limit=8`);
//         const response = await axios.get(url);
//         setMyAnswers(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     MyAnswers();
//     const MyQuestions = async () => {
//       try {
//         // const response = await axios.get(`${url1}?_page=${currentPage}&_limit=8`);
//         const response = await axios.get(url1);
//         setMyQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     MyQuestions();
const MyAnswersAndQuestions = async () => {
  try {
    const response = await axios.get(`${url2}?_page=${currentPage}&_limit=3`);
    // const response = await axios.get(url2);
    setActivities(response.data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
MyAnswersAndQuestions();
  },[])


  

 

  return (
    <div>
   
    <Row>
   
     {/* Pass myquestions array */}
      <Colxx>
      <h1 className='text-center text-large w-100 py-2'>My questions and answers</h1>
      <div>
      <div className='mt-2'>
      <div className='d-flex justify-content-between'>
      <h2 className='font-weight-semibold'>Questions</h2>
      <Button color="primary" className=''>Recent</Button>
      </div>
      {/* {myquestions&&myquestions.map((num)=>{
         return(
          <div key={num.totalQuestions}>
          <h3>view all <span className='font-weight-semibold'>{num.totalQuestions}</span> Questions</h3>
      
          </div>
         )
        })} */}
        {activities.myQuestions&&activities.myQuestions.map((num)=>{
         return(
          <div key={num.totalQuestions}>
          <h3>view all <span className='font-weight-semibold'>{num.totalQuestions}</span> Questions</h3>
      
          </div>
         )
        })}
      
      
        
      </div>
        
         <Card className='mt-3'>
          <CardBody>
           <div className=''>
           <div className=''>
           {/* {myquestions&&myquestions.map((qs)=>{
              return (
                <div key={qs.totalAnswers}>
                  
                  <div className='' key={qs.totalAnswers}>
               
                <h3>{qs.questions.map((s)=>{
                  const qdate=new Date(s.timestamp);
                  const qsdateformat = `${qdate.getDate()}/${qdate.getMonth()+1}/${qdate.getFullYear()}`;
                  return (
                    <div key={s.questionId}>
                   
                      <div className='d-flex   justify-content-between'>
                      <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                      <h3>{s.question}</h3>
                     
                     
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
            })} */}
            {activities.myQuestions&&activities.myQuestions.map((qs)=>{
              return (
                <div key={qs.totalAnswers}>
                  
                  <div className='' key={qs.totalAnswers}>
               
                <h3>{qs.questions.map((s)=>{
                  const qdate=new Date(s.timestamp);
                  const qsdateformat = `${qdate.getDate()}/${qdate.getMonth()+1}/${qdate.getFullYear()}`;
                  return (
                    <div key={s.questionId}>
                   
                      <div className='d-flex   justify-content-between'>
                      <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                      <h3>{s.question}</h3>
                     
                     
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
        {/* {myanswers&&myanswers.map((num)=>{
         return(
          <div key={num.totalAnswers}>
          <h3>view all <span className="font-weight-semibold">{num.totalAnswers}</span> answers</h3>
      
          </div>
         )
        })} */}
        {activities.myAnswers&&activities.myAnswers.map((num)=>{
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
           {/* {myanswers&&myanswers.map((ans)=>{
           
              return (
                
                <div key={ans.totalAnswers}>
                  
                  <div className='' key={ans.totalAnswers}>
             
                <h3>{ans.answers.map((s)=>{
                  const ansdate=new Date(s.timestamp);
                  const ansdateformat = `${ansdate.getDate()}/${ansdate.getMonth()+1}/${ansdate.getFullYear()}`;
                  return (
                    <div key={s.questionId}>
                   
                      <div className='d-flex   justify-content-between'>
                      <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                      <h3>{s.question}</h3>
                
                     
                      </NavLink>
                    
                      <h3>{ansdateformat}</h3>
                     
                     
                      </div>
                     <hr/>
                    
                   
                    </div>
                  )
                })}</h3>
               
           </div>
                 
                </div>
              
              )
            })} */}
            {activities.myAnswers&&activities.myAnswers.map((ans)=>{
           
           return (
             
             <div key={ans.totalAnswers}>
               
               <div className='' key={ans.totalAnswers}>
          
             <h3>{ans.answers.map((s)=>{
               const ansdate=new Date(s.timestamp);
               const ansdateformat = `${ansdate.getDate()}/${ansdate.getMonth()+1}/${ansdate.getFullYear()}`;
               return (
                 <div key={s.questionId}>
                
                   <div className='d-flex   justify-content-between'>
                   <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                   <h3>{s.question}</h3>
             
                  
                   </NavLink>
                 
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
           
           </div>
           
          </CardBody>
         </Card>
       
      </div>
      </Colxx>
    </Row>
    <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => setCurrentPage(i)}
      />
    </div>
  );
}

export default MyQandA;
