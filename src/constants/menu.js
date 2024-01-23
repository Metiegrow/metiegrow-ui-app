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
];
export default data;
