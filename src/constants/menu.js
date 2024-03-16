import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'profile',
    icon: 'iconsminds-home',
    label: 'menu.home',
    to: `${adminRoot}/profile`,
  },
  {
    id: 'Mentor',
    icon: 'simple-icon-people',
    label: 'MentorShip',
    to: `${adminRoot}/mentor`,
    subs: [
      {
        icon: 'simple-icon-user',
        label: 'Find Mentors',
        to: `${adminRoot}/mentor`,
   
      },
      {
        icon: 'simple-icon-list',
        label: 'Mentor sessions',
        to: `${adminRoot}/sessionlists`,
   
      },
      {
        icon: 'simple-icon-question',
        label: 'Questions & Answers',
        to: `${adminRoot}/questions`,
   
      },
      {
        icon: 'simple-icon-question',
        label: 'My Q&A activities ',
        to: `${adminRoot}/myactivities`,
   
      },
      // {
      //   icon: 'simple-icon-bubbles',
      //   label: 'Chat',
      //   to: `${adminRoot}/chat`,
   
      // },
      // {
      //   icon: 'simple-icon-calendar',
      //   label: 'Calendar',
      //   to: `${adminRoot}/calendar`,
   
      // },
     
    ]
  },
  {
    id: 'Lawyer',
    icon: 'iconsminds-scale',
    label: 'Lawyer',
    to: `${adminRoot}/lawyer`,
    subs: [
      {
        icon: 'simple-icon-user',
        label: 'Find lawyers',
        to: `${adminRoot}/usercard`,
   
      },
   
    ]
  },
  {
    id: 'myapplications',
    icon: 'iconsminds-folder',
    label: 'menu.myapplications',
    to: `${adminRoot}/myapplications`,
  },
  {
    id: 'mydetails',
    icon: 'iconsminds-folder',
    label: 'menu.mydetails',
    to: `${adminRoot}/mydetails`,
  },
  {
    id: 'mydocuments',
    icon: 'iconsminds-folder',
    label: 'menu.mydocuments',
    to: `${adminRoot}/mydocuments`,
  },
  {
    id: 'App',
    icon: 'iconsminds-folder',
    label: 'menu.myapp',
    to: `${adminRoot}/myapp`,
  },
  {
    id: 'Login',
    icon: 'iconsminds-folder',
    label: 'Apply as a mentor',
    to: `${adminRoot}/mentor/apply`,
    
  },
  // {
  //   id: 'videocall',
  //   icon: 'iconsminds-speach-bubbles',
  //   label: 'Video Call',
  //   to: `${adminRoot}/videocall`,
  // },
  {
    id: 'Listing',
    icon: 'simple-icon-list',
    label: 'Listing',
    to: `${adminRoot}/listing`,
  }
  
];
export default data;
