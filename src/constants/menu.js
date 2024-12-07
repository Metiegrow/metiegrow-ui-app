import { adminRoot } from "./defaultValues";

const data = [
  {
    id: "Dashboard",
    icon: "iconsminds-shop-4",
    label: "Dashboard",
    to: `${adminRoot}/dashboard`,
    roles: ["USER"],
  },
  {
    id: "Mentor",
    icon: "simple-icon-people",
    label: "MentorShip",
    to: `${adminRoot}/mentor/list`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI"],
  },
  {
    id: "Student",
    icon: "iconsminds-students",
    label: "Student",
    to: `${adminRoot}/student/list`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI"],
    subs: [],
  },
  {
    id: "Q & A",
    icon: "simple-icon-question",
    label: "Q & A",
    to: `${adminRoot}/questions`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI"],
    subs: [],
  },
  {
    id: "Lawyer",
    icon: "iconsminds-scale",
    label: "Lawyer",
    to: `${adminRoot}/lawyer/list`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI"],
  },
  {
    id: "Alumni",
    icon: "iconsminds-student-hat",
    label: "Alumni",
    to: `${adminRoot}/alumni/alumnilists`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI"],
  },
  {
    id: "Listing",
    icon: "simple-icon-list",
    label: "Listing",
    to: `${adminRoot}/listing/job`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI", "HR", "REALESTATE"],
  },
  {
    id: "Chat",
    icon: "simple-icon-bubbles",
    label: "Chat",
    to: `${adminRoot}/chat`,
    roles: ["ADMIN", "USER", "MENTOR", "ALUMNI"],
  },
];

export default data;
