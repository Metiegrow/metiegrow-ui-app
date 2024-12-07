/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import { useState } from "react";
import { injectIntl } from "react-intl";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  changeLocale,
  clickOnMobileMenu,
  logoutUser,
  setContainerClassnames,
} from "redux/actions";

import { MenuIcon, MobileMenuIcon } from "components/svg";
import {
  adminRoot,
  baseUrl,
  isDarkSwitchActive,
  searchPath,
} from "constants/defaultValues";
import ThumbnailLetters from "views/app/myapp/Chat/ThumbnailLetters";
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
    return localStorage.getItem("roleRes");
  }
  function getExpTime() {
    return localStorage.getItem("expirationTime");
  }

  const roleRes = getRoleRes();
  const expTime = getExpTime();

  const timeUntilExpiration = expTime - Date.now();
  setTimeout(() => {
    localStorage.clear();
    logoutUserAction(history);
  }, timeUntilExpiration);

  let session;

  if (roleRes.includes("MENTOR") || roleRes.includes("ALUMNI")) {
    session = `${adminRoot}/sessionmentor`;
  } else if (roleRes.includes("USER")) {
    session = `${adminRoot}/sessionlists`;
  }

  let myProfile;
  if (roleRes.includes("MENTOR")) {
    myProfile = `${adminRoot}/mentor/myprofile`;
  } else if (roleRes.includes("LAWYER")) {
    myProfile = `${adminRoot}/lawyer/myprofile`;
  } else if (roleRes.includes("USER")) {
    myProfile = `${adminRoot}/student/myprofile`;
  } else if (roleRes.includes("ALUMNI")) {
    myProfile = `${adminRoot}/alumni/myprofile`;
  } else if (roleRes.includes("HR")) {
    myProfile = `${adminRoot}/alumni/myprofile`;
  } else if (roleRes.includes("REALESTATE")) {
    myProfile = `${adminRoot}/alumni/myprofile`;
  }

  const handleMyProfileClick = () => {
    history.push(myProfile);
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
  const handleMyAlumniSession = () => {
    history.push(`${adminRoot}/alumni/sessionlists`);
  };
  const handleMyLawyerJobsClick = () => {
    history.push(`${adminRoot}/jobslist`);
  };
  const handleMyClientJobsClick = () => {
    history.push(`${adminRoot}/lawyerjobslist`);
  };
  const handleMySlots = () => {
    history.push(`${adminRoot}/calendar/mentor/appointment`);
  };
  const handleSettingsClick = () => {
    history.push(`${adminRoot}/settings`);
  };

  const handleLogout = () => {
    logoutUserAction(history);
    localStorage.removeItem("roleRes");
    localStorage.removeItem("tokenRes");
    localStorage.removeItem("status");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("__theme_selected_color");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("__theme_radius");
  };

  const renderMySlots = () => {
    if (roleRes.includes("MENTOR")) {
      return (
        <NavLink to={`${adminRoot}/calendar/mentor/appointment`}>
          <DropdownItem onClick={() => handleMySlots()}>
            <i className="simple-icon-wallet" /> My Slots
          </DropdownItem>
        </NavLink>
      );
    }

    if (roleRes.includes("ALUMNI")) {
      return (
        <NavLink to={`${adminRoot}/calendar/mentor/appointment`}>
          <DropdownItem onClick={() => handleMySlots()}>
            <i className="simple-icon-wallet" /> My Slots
          </DropdownItem>
        </NavLink>
      );
    }

    return null;
  };

  const renderMyWallet = () => {
    if (roleRes.includes("USER")) {
      return (
        <>
          <NavLink to={`${adminRoot}/mywallet`}>
            <DropdownItem onClick={() => handleMyWalletClick()}>
              <i className="simple-icon-wallet" /> My Wallet
            </DropdownItem>
          </NavLink>
          <NavLink to={`${adminRoot}/lawyerjobslist`}>
            <DropdownItem onClick={() => handleMyClientJobsClick()}>
              <i className="iconsminds-scale" /> My Lawyer Jobs
            </DropdownItem>
          </NavLink>
        </>
      );
    }
    return null;
  };
  const renderClientJob = () => {
    if (roleRes.includes("LAWYER")) {
      return (
        <NavLink to={`${adminRoot}/jobslist`}>
          <DropdownItem onClick={() => handleMyLawyerJobsClick()}>
            <i className="iconsminds-scale" /> My Client Jobs
          </DropdownItem>
        </NavLink>
      );
    }
    return null;
  };
  // const renderMentorSession = () => {
  //   if (
  //     roleRes.includes("USER") ||
  //     roleRes.includes("MENTOR") ||
  //     roleRes.includes("ALUMNI")
  //   ) {
  //     return (
  //       <NavLink to={session}>
  //         <DropdownItem onClick={() => handleMySessionsClick()}>
  //           <i className="simple-icon-list" /> My Mentor Sessions
  //         </DropdownItem>
  //       </NavLink>
  //     );
  //   }
  //   return null;
  // };
  const renderMyAlumniSessions = () => {
    if (roleRes.includes("USER")) {
      return (
        <NavLink to={`${adminRoot}/alumni/sessionlists`}>
          <DropdownItem onClick={() => handleMyAlumniSession()}>
            <i className="simple-icon-list" /> My Alumni Sessions
          </DropdownItem>
        </NavLink>
      );
    }
    return null;
  };

  const renderMentorSession = () => {
    if (roleRes.includes("USER")) {
      return (
        <NavLink to={session}>
          <DropdownItem onClick={() => handleMySessionsClick()}>
            <i className="simple-icon-list" /> My Mentor Sessions
          </DropdownItem>
        </NavLink>
      );
    }

    if (roleRes.includes("MENTOR") || roleRes.includes("ALUMNI")) {
      return (
        <NavLink to={session}>
          <DropdownItem onClick={() => handleMySessionsClick()}>
            <i className="simple-icon-list" /> My Sessions
          </DropdownItem>
        </NavLink>
      );
    }
    return null;
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

  const userName = localStorage.getItem("userName");

  const imageUrl = localStorage.getItem("imageUrl");
  // console.log("img",imageUrl)

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

        {/* <div className="d-flex align-items-center justify-content-between w-100">
          <NavLink to="" className="">
            <span className="">Home</span>
          </NavLink>
          <NavLink to="" id="courses">
            <span className="">Courses</span>
          </NavLink>
          <NavLink to="">
            <span className="">Services</span>
          </NavLink>
          
          <NavLink to="">
            <span className="">Sign up / Login</span>
          </NavLink>
          <NavLink to="">
            <span className="">My Profile</span>
          </NavLink>
          <NavLink to="">
            <span className="">My File</span>
          </NavLink>
        </div> */}
      </div>

      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />

        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        <TopnavNotifications />

        {isDarkSwitchActive && <TopnavDarkSwitch />}

        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span>
                {imageUrl === "null" ? (
                  // <img alt="Profile" src='/assets/img/profiles/l-2.jpg' />
                  <Row className="ml-2 mr-2 ml-md-0 mr-md-0">
                    <span className="name mt-2 ml-2 mr-2">{userName}</span>
                    <ThumbnailLetters
                      extraSmall
                      rounded
                      text={userName}
                      className=""
                    />
                  </Row>
                ) : (
                  <>
                    <span className="name mr-1">{userName}</span>
                    <img
                      alt="Profile"
                      src={`${baseUrl}/${imageUrl}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  </>
                )}
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <NavLink to={myProfile}>
                <DropdownItem onClick={() => handleMyProfileClick()}>
                  <i className="simple-icon-user" /> My Profile
                </DropdownItem>
              </NavLink>
              {renderMyWallet()}
              {/* <NavLink to={`${adminRoot}/mywallet`}>
                <DropdownItem onClick={() => handleMyWalletClick()}>
                <i className="simple-icon-wallet" />  My Wallet
                </DropdownItem>
              </NavLink> */}

              {/* <NavLink to={`${adminRoot}/calendar/mentor/appointment`}>
                <DropdownItem onClick={() => handleMySlots()}>
                <i className="simple-icon-wallet" />  My Slots
                </DropdownItem>
              </NavLink> */}
              {renderMySlots()}
              {/* <NavLink to={`${adminRoot}/mylisting`}> */}
              <NavLink to={`${adminRoot}/myactivities`}>
                <DropdownItem onClick={() => handleMyActivitiesClick()}>
                  <i className="simple-icon-question" /> My Activities
                </DropdownItem>
              </NavLink>
              {renderMentorSession()}
              {renderMyAlumniSessions()}
              {/* <NavLink to={session}>
                <DropdownItem onClick={() => handleMySessionsClick()}>
                <i className="simple-icon-list" /> Mentor Sessions
                </DropdownItem>
              </NavLink> */}
              {/* <NavLink to={`${adminRoot}/jobslist`}>
                <DropdownItem onClick={() => handleMyLawyerJobsClick()}>
                <i className="iconsminds-scale" />  My Client Jobs
                </DropdownItem>
              </NavLink> */}
              {/* <NavLink to={`${adminRoot}/lawyerjobslist`}>
                <DropdownItem onClick={() => handleMyClientJobsClick()}>
                <i className="iconsminds-scale" />  My Lawyer Jobs
                </DropdownItem>
              </NavLink> */}
              {renderClientJob()}
              <DropdownItem onClick={() => handleMyListingClick()}>
                <i className="simple-icon-list" /> My Listing
              </DropdownItem>
              {/* </NavLink> */}
              <DropdownItem onClick={handleSettingsClick}>
                <i className="simple-icon-settings" /> Settings
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
                <i className="simple-icon-logout" /> Sign out
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
