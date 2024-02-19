import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { injectIntl } from 'react-intl';


const DateRangePicker = ({selectedDate,setSelectedDate}) => {
    // const [startDate, setStartDate] = useState(new Date());
    // const [startDate, setStartDate] = useState(selectedDate);
    // const { messages } = intl;
  return (
    <div>
       <div className="ml-3">
              <DatePicker
                // selected={startDate}
                selected={selectedDate}
                // onChange={setStartDate}
                onChange={date => setSelectedDate(date)}
                // placeholderText={messages['forms.date']}
              />
            </div>
    </div>
  );
}

export default  injectIntl(DateRangePicker);
