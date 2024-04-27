/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
// import notifications from 'data/notifications';
import { adminRoot, baseUrl } from "constants/defaultValues";

const NotificationItem = ({ img, title, date }) => {
  return (
    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
      <NavLink to={`${adminRoot}/pages/product/details`}>
        <img
          src={img}
          alt={title}
          className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
        />
      </NavLink>
      <div className="pl-3 pr-2">
        <NavLink to={`${adminRoot}/pages/product/details`}>
          <p className="font-weight-medium mb-1">{title}</p>
          <p className="text-muted mb-0 text-small">{date}</p>
        </NavLink>
      </div>
    </div>
  );
};

const TopnavNotifications = () => {
  const url = `${baseUrl}/notifications`;

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const notificationData = async () => {
      const response = await axios.get(url);

      const notification = response.data;
      // console.log(notification);
      setNotifications(notification);
    };
    notificationData();
  }, []);
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          <span className="count">{notifications.length}</span>
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          {notifications.length === 0 ? (
            <div className="p-3 text-center">You don&apos;t have any notifications</div>
          ) : (
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {notifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification} />;
            })}
          </PerfectScrollbar>
                )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
