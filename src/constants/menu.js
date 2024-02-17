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
    label: 'mylogin',
    to: `${adminRoot}/mylogin`,
  },
  {
    id: 'Chat',
    icon: 'iconsminds-speach-bubbles',
    label: 'Chat',
    to: `${adminRoot}/chat`,
  },
  // {
  //   id: 'videoroom',
  //   icon: 'iconsminds-speach-bubbles',
  //   label: 'Video Room',
  //   to: `${adminRoot}/videoroom`,
  // },
];
export default data;
