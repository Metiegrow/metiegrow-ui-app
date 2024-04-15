import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { injectIntl } from 'react-intl';


const DateRangePicker = ({selectedDate,setSelectedDate}) => {
    // const [startDate, setStartDate] = useState(new Date());
    // const [startDate, setStartDate] = useState(selectedDate);
    // const { messages } = intl;
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  return (
    <div>
       <div className="">
              <DatePicker
                // selected={startDate}
                selected={selectedDate}
                // onChange={setStartDate}
                // onChange={date => setSelectedDate(date)}
                onChange={handleDateChange} // Pass the handler function to onChange
                // setSelectedDate={setSelectedDate} 
                // placeholderText={messages['forms.date']}
                // placeholderText='MM/DD/YYYY'
              />
            </div>
    </div>
  );
}

export default  injectIntl(DateRangePicker);
