
import axios from 'axios'
import { Colxx } from 'components/common/CustomBootstrap'
import { baseUrl } from 'constants/defaultValues'
import React,{useState,useEffect} from 'react'
import { Button, Card, CardBody, NavLink} from 'reactstrap'
import {useParams} from "react-router-dom";




const MentorAnswers = () => {
  const {questionId}=useParams();
  // console.log(questionId);
    const [inputkey,setInputKey]=useState('')
    const url=`${baseUrl}/mentorAnswers/${questionId}`;
    const url1=`${baseUrl}/multipleQuestions/${questionId}`;
    const[answers,setAnswers]=useState([]);
    const[answers1,setAnswers1]=useState([]);
    // const [textQuillBubble, setTextQuillBubble] = useState('');
    
 
  
    useEffect(()=>{
      const AnswersByMentors = async () => {
        try {
          const response = await axios.get(url1);
          setAnswers(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      AnswersByMentors();

      const AnswersByMentors1 = async () => {
        try {
          const response = await axios.get(url);
          setAnswers1(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      AnswersByMentors1();
    },[])
   
  
 
    // if (Array.isArray(answers1.answer)) {
    //   const answerArrayLength = answers1.answer.length;
    //   console.log('Length of the "answer" array:', answerArrayLength);
    // } else {
    //   console.log('The "answer" property is not an array or does not exist.');
    // }

  // const findlen=Object.keys(answers1).length 
  // console.log("lets check",findlen);

  return (
     
    <div className=''>
     
  
     <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
     {/* <h1>This is id of the question :{questionId}</h1><br/> */}
     {/* <h1>Yeah {answers.id}</h1> */}
     <div className="form-group">
       <div className='input-group'>
       <input
            type="text"
            className="form-control   "
            placeholder ='Search here'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          />
         {/* <i className="simple-icon-magnifier" /> */}
         
         

       </div>
  
     {/*  Questions card starts */}

     <Card className=' mt-3' >

        <CardBody>
         <h3 className='font-weight-semibold'>{answers.questionHeading}</h3>
         <h6 className='text-muted'>Asked for Male Student, 25 Years</h6>
         {/* <p className='text-one'>How do I become better at public speaking?<br/>
         What do you do to avoid nervousness when speaking in public?</p> */}
         <p className='text-one'>{answers.questionHeadingBrief}</p>
         <h6 className='text-muted'>Asked on  {new Date(answers.time ).toLocaleString()}</h6>
     <hr/>
     <div className='d-flex justify-content-between'>
        <h6 className='font-weight-semibold'>{answers.views}<span className='text-muted'> views</span></h6>
        <span className='text-one'><i className='iconsminds-mail-inbox' /></span>
     </div>
        </CardBody>
       
     </Card>
    
     <div className='w-100'>
      
      {/* <Button color="primary " className="default w-20 py-0   rounded" >
      Ask a questions
      </Button> */}
     
      <NavLink href='/app/askquestions'>
      <Button color="primary" outline block className="default mt-3 mb-2 text-one py-3 w-100" >
        Ask a Free Question
      </Button>
      
     
      </NavLink>
      
    
      
     
</div>
{/* <div className=''>
      
    
    
      <Button color="primary" outline block className="default mt-3 mb-2 text-one py-3">
        Ask a Free Question
      </Button>
      
      
     
</div> */}
     {/*  Questions  card ends  */}
     

     <div className=' mt-3 d-flex justify-content-between font-weight-medium'>
      <h6>Answers {answers1.answer && answers1.answer.length} </h6>
    
      <h6>Like the answers? Consult privately with the Mentor of your choice</h6>
     </div>
     {/*  answer starts  */}
    
     {/* <Card className=' mt-3'>
     
    

 
     <div  key={answers1.id}>
        <Card>
        <CardBody>
      <div className='d-flex w-100 justify-content-between'>
      <div>
          <h3 className=''>{answers1.mentorName}</h3>
          <p className='text-one text-muted'>{answers.mentorRole}</p>
        </div>
       <div>
    
       <NavLink href='/app/mentorconsult'>
       <Button outline color="primary" size='sm' className="">
              Consult Now
              </Button>
       </NavLink>
      
       </div>
    
      
   
      </div>
     
       <div className='mt-2'>
  
        <p className='w-60 font-weight-semibold text-one'>
        {answers1.answer&&answers1.answer.map((a)=>{
          return (
            <div key={a.id} className='my-3'>
            {a.answered} 
            </div>
        
          )
    
        })}
        </p>
        <p>Answered 6 years ago</p>
        <p>0/1 people found this helpful</p>
        <hr/>
        <div className='d-flex justify-content-between'>
        <h6>Was this answer helpful?</h6>
        <div>
        <Button outline color="primary" size='sm' className="mr-2">
              Yes
              </Button>
              <Button outline color="primary" size='sm' className="">
              No
              </Button>
        </div>
        </div>
        
       </div>
      </CardBody>
        </Card>
        
        </div>
     </Card> */}
      {answers1.answer&&answers1.answer.map((an)=>{
        return (
         
        <Card key={an.mentorId} className='mt-3'>
        <CardBody>
        <div className='d-flex w-100 justify-content-between'>
        <div className=' '>
        <h3>{an.mentorName}</h3>
        <p className='text-one text-muted'>{an.mentorRole}</p>
        </div>
        <div>
    
        <NavLink href='/app/mentorconsult'>
        <Button outline color="primary" size='sm' className="">
             Consult Now
         </Button>
         </NavLink>
   
    </div>
        </div>
        
          <p>{an.answered}</p>
          <p>Answered 6 years ago</p>
        <p>0/1 people found this helpful</p>
        <hr/>
        <div className='d-flex justify-content-between'>
        <h6>Was this answer helpful?</h6>
        <div>
        <Button outline color="primary" size='sm' className="mr-2">
              Yes
              </Button>
              <Button outline color="primary" size='sm' className="">
              No
              </Button>
        </div>
        </div>
          
        </CardBody>
        {/* <div className='d-flex w-100 justify-content-between'>
      <div>
          <h3 className=''>{answers1.mentorName}</h3>
          <p className='text-one text-muted'>{answers.mentorRole}</p>
        </div>
       <div>
    
       <NavLink href='/app/mentorconsult'>
       <Button outline color="primary" size='sm' className="">
              Consult Now
              </Button>
       </NavLink>
      
       </div> */}
        </Card>
        )
      })}

     {/*  answer ends  */}
        </div>
        
     </Colxx>
     
    </div>
  )
}

export default MentorAnswers
