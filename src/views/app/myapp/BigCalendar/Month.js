import { Colxx } from 'components/common/CustomBootstrap';
import React,{useState} from 'react';
import {  Button, Card, CardBody, Table } from 'reactstrap';

import EventModal from './EventModal';



const Month = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedRowPosition, setClickedRowPosition] = useState({ top: 0, left: 0 });
 
  const handleRowClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setClickedRowPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setModalOpen(true);
    
  }
  
  return (
    <div>
     

    
    <Colxx xxs="6" className='mx-auto'>
    <h2>Mentor availability</h2>
    <div className='font-weight-semibold'>
      <span className='font-weight-semibold text-one'><i className='simple-icon-arrow-left'/></span>
      <span className='ml-5 font-weight-semibold text-one' ><i className='simple-icon-arrow-right '/></span>
    </div>
          <Card className="mb-4 mt-4">
            <CardBody>
             
              <Table bordered>
                <thead>
                  <tr >
                    <th>Date</th>
                    <th>Availablilty time</th>
                     
                  </tr>
                </thead>
                <tbody >
                  <tr onClick={(event) => handleRowClick(event)}>
                    
                    <td>Feb 01,2024</td>
                    <td>10pm to 12pm</td>
                    
                  </tr>
                  <tr>
                    
                    <td>Feb 02,2024</td>
                    <td>7pm to 12pm</td>
                  </tr>
                  <tr>
                    
                    <td>Feb 03,2024</td>
                    <td>8pm to 12pm</td>
                  </tr>
                  <tr>
                 
                    <td>Feb 04,2024</td>
                    <td>8pm to 12pm</td>
                  </tr>
                  <tr>
                    
                    <td>Feb 05,2024</td>
                    <td>8pm to 12pm</td>
                  </tr>
                </tbody>
              </Table>
              <Button>Book Now</Button>
              {isModalOpen && <EventModal onClose={() => setModalOpen(false)} 
                  clickedRowPosition={clickedRowPosition}
              />}
            </CardBody>
          </Card>
          {/* <EventModal/> */}
        </Colxx>
    </div>
  );
}

export default Month;
