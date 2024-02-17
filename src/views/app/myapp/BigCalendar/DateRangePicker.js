import React ,{useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { injectIntl } from 'react-intl';


const DateRangePicker = ({intl}) => {
    const [startDate, setStartDate] = useState(new Date());
    const { messages } = intl;
  return (
    <div>
       <div className="ml-3">
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                placeholderText={messages['forms.date']}
              />
            </div>
    </div>
  );
}

export default  injectIntl(DateRangePicker);
