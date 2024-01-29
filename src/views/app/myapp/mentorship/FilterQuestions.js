import axios from 'axios';
import { Colxx } from 'components/common/CustomBootstrap';
import { baseUrl } from 'constants/defaultValues';
import React,{useState,useEffect} from 'react';
import { Card, CardBody, NavLink } from 'reactstrap';

const FilterQuestions = () => {
    const [inputkey,setInputKey]=useState('')
    // const url=`${baseUrl}/mentor/questions`;
    const url=`${baseUrl}/multipleQuestions`;
    const[multiquestions,setMultiQuestions]=useState([]);
    
   
    // console.log(date.toLocaleString());
  
    useEffect(()=>{
      const FilterMultiQuestions = async () => {
        try {
          const response = await axios.get(url);
          setMultiQuestions(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      FilterMultiQuestions();
    },[])
  
  return (
    <div>
        <Colxx  sm="12" md="12" lg="8" xxs="12" className='mx-auto '>
        {/* <Card>
         <CardBody>
         <input
            type="text"
            className="form-control shadow-one border-none"
            placeholder ='Search here'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          />
       
         
         

     
         </CardBody>
      </Card> */}
  
      <input
            type="text"
            className="form-control shadow-none border-none py-3 text-one font-weight-medium"
            placeholder ='Search questions here'
            value={inputkey}
            onChange={(e) =>setInputKey(e.target.value)}
          />
       
      <Card className='my-3'>
        <CardBody>
            <h1 className='font-weight-semibold'>Recently Answered Questions on topics</h1>
            <hr/>
            
            {/* <NavLink href={`/app/mentoranswers/${multiquestions.id}`}> */}
            {/* <div>
           
           <h2 className='font-weight-medium '>I have one doubt</h2>
               <p>I have fever and the temperature is of fever is up and down so what I am doing</p>
               <h6 className='text-muted'>200 views</h6>
           </div> */}
           {multiquestions.map((qs)=>{
            const date = new Date(qs.time);
        return(
          
            <div key={qs.id}>
            <NavLink href={`/app/questions/${qs.id}`}>
               
             <h2 className='font-weight-medium'>{qs.questionHeading}</h2>
             <p>{qs.questionHeadingBrief}</p>
             <h6 className='text-muted'>{qs.views} views</h6>
             <h6  className='text-muted'>Asked on {date.toLocaleString()}</h6>
             </NavLink>
             <hr/>
             
            </div>
           
        
        )
       
      })}
      
          
          
        </CardBody>
      </Card>
        </Colxx>
     
    </div>
  );
}

export default FilterQuestions;
