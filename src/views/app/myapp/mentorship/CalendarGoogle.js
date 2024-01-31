// import React from 'react';
// // import React from 'react';
// import { Card, CardBody, CardTitle, Row } from 'reactstrap';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';

// import CalendarToolbar from 'components/CalendarToolbar';

// import data from 'data/events';

// import { getDirection } from 'helpers/Utils';
// import { Colxx } from 'components/common/CustomBootstrap';

// const localizer = momentLocalizer(moment);

// const CalendarGoogle = () => {
//   return (
//     <div>
//        {/* <Card>
//       <CardBody>
//         <CardTitle>
//           <IntlMessages id="dashboards.calendar" />
//         </CardTitle>
//         <Calendar
//           localizer={localizer}
//           style={{ minHeight: '500px' }}
//           events={data}
//           rtl={getDirection().isRtl}
//           views={['month']}
//           components={{
//             toolbar: CalendarToolbar,
//           }}
//         />
//       </CardBody>
//     </Card> */}  <Row>
//         <Colxx xl="4" lg="4" className="mb-4">
//         <Card>
//       <CardBody>
//         <CardTitle>
         
//           Calendar
//         </CardTitle>
//         <Calendar
//           localizer={localizer}
//           style={{ minHeight: '500px' }}
//           events={data}
//           rtl={getDirection().isRtl}
//           views={['month']}
       
//           components={{
//         toolbar: (props) => <CalendarToolbar {...props} />,
//       }}
//         />
//       </CardBody>
//     </Card>
//         </Colxx>
        
//       </Row>
    
//     </div>
//   );
// }

// export default CalendarGoogle;
