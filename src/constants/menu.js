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
        label: 'MentorCard',
        to: `${adminRoot}/mentor`,
   
      },
      {
        icon: 'simple-icon-question',
        label: 'Student Questions',
        to: `${adminRoot}/questions`,
   
      },
      {
        icon: 'simple-icon-bubbles',
        label: 'Chat',
        to: `${adminRoot}/chat`,
   
      },
      {
        icon: 'simple-icon-calendar',
        label: 'Calendar',
        to: `${adminRoot}/calendar`,
   
      },
      {
        icon: 'simple-icon-list',
        label: 'SessionList',
        to: `${adminRoot}/sessionlists`,
   
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
  {
    id: 'Listing',
    icon: 'simple-icon-list',
    label: 'Listing',
    to: `${adminRoot}/listing`,
    subs: [
      {
        icon: 'iconsminds-office',
        label: 'Job Posting',
        to: `${adminRoot}/jobposting`,
   
      },
      {
        icon: 'iconsminds-building',
        label: 'Stay Posting',
        to: `${adminRoot}/stayposting`,
   
      },
      {
        icon: 'iconsminds-building',
        label: 'Other Posting',
        to: `${adminRoot}/otherposting`,
   
      },
      {
        icon: 'simple-icon-list',
        label: 'Job Listing',
        to: `${adminRoot}/job/listing`,
   
      },
      {
        icon: 'simple-icon-list',
        label: 'Stay Listing',
        to: `${adminRoot}/stay/listing`,
   
      },
      {
        icon: 'simple-icon-list',
        label: 'Other Listing',
        to: `${adminRoot}/other/listing`,
   
      }
    ]
  },
  {
    id: 'Chat',
    icon: 'iconsminds-speach-bubbles',
    label: 'Chat',
    to: `${adminRoot}/chat`,
  },
  // {
  //   id: 'videocall',
  //   icon: 'iconsminds-speach-bubbles',
  //   label: 'Video Call',
  //   to: `${adminRoot}/videocall`,
  // },
];
export default data;
