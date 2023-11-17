import { myDetailsService } from '../../../../../services/services';
// import { jobService } from '../../../../../services/jobservice';

// myDetailsService.postEducationalInformation({
//   bachelorDegName: 'BS 2',
//   bachelorDomain: 2,
//   bachelorPercent: 210,
//   backlogs: 23,
//   tenthPercent: 215,
//   twelfthGroup: 'group 1',
//   twelfthPercent: 14,
//   userId: 1,
// });

// jobService.getJob().then((res) => {
//   console.log(res);
// });

myDetailsService.getEducationalInformation();

const educationalInformationData = {
  id: 0,
  payload: [
    {
      id: 0,
      title: 'Tenth Percentage',
      value: `92.3`,
      statusColor: 'red',
    },
    {
      id: 1,
      title: 'Twelveth Percentage',
      value: `83`,
      statusColor: 'red',
    },
    {
      id: 2,
      title: 'Twelveth Group',
      value: 'Group1',
      statusColor: 'red',
    },
    {
      id: 3,
      title: 'Bachelor Degree',
      value: 'CS',
      statusColor: 'red',
    },
    {
      id: 4,
      title: 'Bachelor Domain Course',
      value: 'Computer',
      statusColor: 'red',
    },
    {
      id: 5,
      title: 'Bachelors Percentage',
      value: `3.8`,
      statusColor: 'red',
    },
    {
      id: 6,
      title: 'Backlogs',
      value: 0,
      statusColor: 'red',
    },
  ],
};

export default educationalInformationData;

// Section 2: Educational Information
// 1. tenth_percent float
// 2. twelfth_percent float
// 3. twelfth_group varchar
// 4. bachelor_deg_name varchar
// 5. bachelor_domain course_category
// 6. bachelor_percent float
// 7. backlogs int
