
import { Colxx } from 'components/common/CustomBootstrap'
import React,{useState} from 'react'
import { Button, Card, CardBody} from 'reactstrap'


const MentorAnswers = () => {
    const [inputkey,setInputKey]=useState('')
  
  return (
   
    <div className=''>
     <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
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
         <h3 className='font-weight-semibold'>Students Problem</h3>
         <h6 className='text-muted'>Asked for Male Student, 25 Years</h6>
         <p className='text-one'>How do I become better at public speaking?<br/>
         What do you do to avoid nervousness when speaking in public?</p>
     <hr/>
     <div className='d-flex justify-content-between'>
        <h6 className='font-weight-semibold'>350<span className='text-muted'> views</span></h6>
        <span className='text-one'><i className='iconsminds-mail-inbox' /></span>
     </div>
        </CardBody>
       
     </Card>
    
     <div className=''>
      
      {/* <Button color="primary " className="default w-20 py-0   rounded" >
      Ask a questions
      </Button> */}
       <Button color="primary" outline block className="default mt-3 mb-2 text-one py-3">
        Ask a Free Question
      </Button>
     
</div>
     {/*  Questions  card ends  */}

     <div className=' mt-3 d-flex justify-content-between font-weight-medium'>
      <h6>Answers(1)</h6>
      <h6>Like the answers? Consult privately with the Mentor of your choice</h6>
     </div>
     {/*  answer starts  */}
    
     <Card className=' mt-3'>
      <CardBody>
      <div className='d-flex w-100 justify-content-between'>
      <div>
          <h3 className='text-large'>Mentor Name</h3>
          <p className='text-one text-muted'>Mentor role</p>
        </div>
       <div>
       {/* <Button size='sm'>Consult Now</Button> */}
       <Button outline color="primary" size='sm' className="">
              Consult Now
              </Button>
       </div>
    
      
      
        {/* <Button color="primary" className="default mb-2 text-small">
                CNOW
              </Button> */}
             
            
              {/* <Button color="primary " className="default w-20 py-0   rounded" >
                        View Profile
              </Button> */}
      </div>
     
       <div className='mt-2'>
        <p className='w-60 font-weight-semibold text-one'>
        Practice your speech multiple times before the actual presentation.
         This helps you become familiar with the content and improves your confidence.
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

     {/*  answer ends  */}
        </div>
     </Colxx>
     
    </div>
  )
}

export default MentorAnswers
