/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { injectIntl } from "react-intl";

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from "redux/actions";

import {
  searchPath,
  isDarkSwitchActive,
  adminRoot,
} from "constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "components/svg";
// import MyProfile from 'views/app/myapp/my-profile/MyProfile';
import TopnavDarkSwitch from "./Topnav.DarkSwitch";
import TopnavNotifications from "./Topnav.Notifications";


// const NotificationData = {
//   payload: [
//     {
//       id: 1,
//       msg: "This is a sample notification",
//       created_at: "2020-09-08",
//     },
//     {
//       id: 2,
//       msg: "This is a sample notification 2",
//       created_at: "2020-09-08",
//     },
//   ],
// };

const TopNav = ({
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword("");
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      removeEventsSearch();
      setSearchKeyword("");
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener("click", handleDocumentClickSearch, true);
  };

  function getRoleRes() {
    return localStorage.getItem('roleRes');
  }

  const roleRes = getRoleRes();
          
let session;  
if (roleRes.includes("MENTOR")) {
  session = `${adminRoot}/sessionmentor`;
}else {
  session = `${adminRoot}/sessionlists`; 
}

  const handleMyProfileClick = () => {
    history.push(`${adminRoot}/myprofile`);
  };
  const handleMyWalletClick = () => {
    history.push(`${adminRoot}/mywallet`);
  };
  const handleMyListingClick = () => {
    history.push(`${adminRoot}/mylisting`);
  };
  const handleMyActivitiesClick = () => {
    history.push(`${adminRoot}/myactivities`);
  };
  const handleMySessionsClick = () => {
    history.push(session);
  };
  const handleMyLawyerJobsClick = () => {
    history.push(`${adminRoot}/jobslist`);
  };
  
  

  const handleLogout = () => {
    logoutUserAction(history);
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        <div className="d-flex align-items-center justify-content-between w-100">
          <NavLink to="" className="">
            <span className="">Home</span>
          </NavLink>
          <NavLink to="" id="courses">
            <span className="">Courses</span>
          </NavLink>
          <NavLink to="">
            <span className="">Services</span>
          </NavLink>
          {/* shows only if logged in */}
          <NavLink to="">
            <span className="">Sign up / Login</span>
          </NavLink>
          <NavLink to="">
            <span className="">My Profile</span>
          </NavLink>
          <NavLink to="">
            <span className="">My File</span>
          </NavLink>
        </div>
      </div>

      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        {/* <div
          style={{
            paddingRight: "20px",
          }}
          className="d-inline-block "
        >
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span>
                <i alt="" className="simple-icon-bell" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {NotificationData.payload.map((product) => {
                return (
                  <div key={product.id}>
                    <DropdownItem
                      onClick={(e) => {
                        console.log(e);
                      }}
                    >
                      {product.msg}
                    </DropdownItem>
                    <DropdownItem divider />
                  </div>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
          <TopnavNotifications />

        {isDarkSwitchActive && <TopnavDarkSwitch />}

        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">Mia Sins</span>
              <span>
                <img alt="Profile" src="/assets/img/profiles/l-1.jpg" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <NavLink to={`${adminRoot}/myprofile`}>
                <DropdownItem onClick={() => handleMyProfileClick()}>
                <i className="simple-icon-user" />  My Profile
                </DropdownItem>
              </NavLink>
              <NavLink to={`${adminRoot}/mywallet`}>
                <DropdownItem onClick={() => handleMyWalletClick()}>
                <i className="simple-icon-wallet" />  My Wallet
                </DropdownItem>
              </NavLink>
              {/* <NavLink to={`${adminRoot}/mylisting`}> */}
                <NavLink to={`${adminRoot}/myactivities`}>
                <DropdownItem onClick={() => handleMyActivitiesClick()}>
                <i className="simple-icon-question" />  My Activities
                </DropdownItem>
              </NavLink>
              <NavLink to={session}>
                <DropdownItem onClick={() => handleMySessionsClick()}>
                <i className="simple-icon-list" />  Sessions
                </DropdownItem>
              </NavLink>
              <NavLink to={`${adminRoot}/jobslist`}>
                <DropdownItem onClick={() => handleMyLawyerJobsClick()}>
                <i className="iconsminds-scale" />  My Lawyer Jobs
                </DropdownItem>
              </NavLink>
              <DropdownItem onClick={() => handleMyListingClick()}>
                <i className="simple-icon-list" />  My Listing
                </DropdownItem>
              {/* </NavLink> */}
              <DropdownItem >
              <i className="simple-icon-settings" />  Settings
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
              <i className="simple-icon-logout" />   Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
