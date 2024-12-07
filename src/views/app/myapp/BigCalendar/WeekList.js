import React, { useState } from 'react';
import { Button } from 'reactstrap';

const WeekDisplay = () => {
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
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div>
      <Button onClick={goToPreviousWeek}>Previous Week</Button>
      <Button onClick={goToNextWeek}>Next Week</Button>
      <div>
        <p>Current Week Start: {formatDate(currentWeekStart)}</p>
        <p>Next Week Start: {formatDate(new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000))}</p>
      </div>
    </div>
  );
};

export default WeekDisplay;
