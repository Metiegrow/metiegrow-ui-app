import { adminRoot } from "./defaultValues";

function getTokenRes() {
  return localStorage.getItem("roleRes");
}
const role = getTokenRes();

const data = [
  {
    id: "profile",
    icon: "iconsminds-home",
    label: "menu.home",
    to: `${adminRoot}/profile`,
  },
  {
    id: "Mentor",
    icon: "simple-icon-people",
    label: "MentorShip",
    to: `${adminRoot}/mentor/list`,
    // subs: [
    //   {
    //     icon: 'simple-icon-user',
    //     label: 'Find Mentors',
    //     to: `${adminRoot}/mentor`,

    //   },
    //   // {
    //   //   icon: 'simple-icon-list',
    //   //   label: 'Mentor sessions',
    //   //   to: `${adminRoot}/sessionlists`,

    //   // },

    //   // {
    //   //   icon: 'simple-icon-question',
    //   //   label: 'My Q&A activities ',
    //   //   to: `${adminRoot}/myactivities`,

    //   // },
    //   // {
    //   //   icon: 'simple-icon-bubbles',
    //   //   label: 'Chat',
    //   //   to: `${adminRoot}/chat`,

    //   // },
    //   // {
    //   //   icon: 'simple-icon-calendar',
    //   //   label: 'Calendar',
    //   //   to: `${adminRoot}/calendar`,

    //   // },

    // ]
  },
  {
    id: "Q & A",
    icon: "simple-icon-question",
    label: "Q & A",
    to: `${adminRoot}/questions`,
    subs: [
      // {
      //   icon: 'simple-icon-question',
      //   label: 'My Q&A activities ',
      //   to: `${adminRoot}/myactivities`,
      // },
      // {
      //   icon: 'simple-icon-question',
      //   label: 'Questions & Answers',
      //   to: `${adminRoot}/questions`,
      // },
    ],
  },
  {
    id: "Lawyer",
    icon: "iconsminds-scale",
    label: "Lawyer",
    to: `${adminRoot}/lawyer/list`,
    // subs: [
    //   {
    //     icon: 'simple-icon-user',
    //     label: 'Find lawyers',
    //     to: `${adminRoot}/usercard`,

    //   },

    // ]
  },
  {
    id: "Alumni",
    icon: "iconsminds-student-hat",
    label: "Alumni",
    to: `${adminRoot}/alumni/alumnilists`,
  
  },
  // {
  //   id: "myapplications",
  //   icon: "iconsminds-folder",
  //   label: "menu.myapplications",
  //   to: `${adminRoot}/myapplications`,
  // },
  // {
  //   id: "mydetails",
  //   icon: "iconsminds-folder",
  //   label: "menu.mydetails",
  //   to: `${adminRoot}/mydetails`,
  // },
  // {
  //   id: "mydocuments",
  //   icon: "iconsminds-folder",
  //   label: "menu.mydocuments",
  //   to: `${adminRoot}/mydocuments`,
  // },
  // {
  //   id: "App",
  //   icon: "iconsminds-folder",
  //   label: "menu.myapp",
  //   to: `${adminRoot}/myapp`,
  // },
  // {
  //   id: "Login",
  //   icon: "iconsminds-folder",
  //   label: "Apply as a mentor",
  //   to: `${adminRoot}/mentor/apply`,
  // },
  // {
  //   id: 'videocall',
  //   icon: 'iconsminds-speach-bubbles',
  //   label: 'Video Call',
  //   to: `${adminRoot}/videocall`,
  // },
  {
    id: "Listing",
    icon: "simple-icon-list",
    label: "Listing",
    to: `${adminRoot}/listing`,
  },
  {
    id: "Chat",
    icon: "simple-icon-bubbles",
    label: "Chat",
    to: `${adminRoot}/chat`,
  },
  {
    id: "classroom",
    icon: "simple-icon-bubbles",
    label: "Class room",
    to: `${adminRoot}/classroom`,
  },
];

if (role === "MENTEE") {
  data.splice(1, 0, {
    id: "Dashboard",
    icon: "iconsminds-shop-4",
    label: "Dashboard",
    to: `${adminRoot}/dashboard`,
  });
}
export default data;
