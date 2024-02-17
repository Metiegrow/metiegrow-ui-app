import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';

const WeekDays = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const goToPreviousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  const goToNextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeekStart(newStartDate);
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getWeekDates = () => {
    const weekDates = [];
    const startDate = new Date(currentWeekStart);
    for (let i = 0; i < 7; i += 1) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };
  const getMonthName = (monthIndex) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[monthIndex];
  };

  return (
    <div>
      <Button onClick={goToPreviousWeek}>Previous Week</Button>
      <Button onClick={goToNextWeek} className='ml-3'>Next Week</Button>
      <div>
        <p>Current Week Start: {formatDate(currentWeekStart)}</p>
        {/* <ul>
          {getWeekDates().map((date) => (
            <li key={date.getTime()}>{formatDate(date)}</li>
          ))}
        </ul> */}
        <Table>
            <tbody>
                
                   
                    {getWeekDates().map((date) => (
                        <tr key={date.getTime()}>
                        <td >{getMonthName(date.getMonth())}  {formatDate(date)} 
            </td>
                        </tr>
           
            
          ))}
                    
           
                    
              
            </tbody>
        </Table>
      </div>
      <p>Next Week Start: {formatDate(new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000))}</p>
    </div>
  );
};

export default WeekDays;
