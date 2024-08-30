import classnames from "classnames";
import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  //   Badge,
  Modal,
  ModalBody,
  ModalHeader,
  //   Card,
  //   CardBody,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
// import Rating from 'components/common/Rating';

// import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from "components/common/CustomBootstrap";

import All from "./All";
import JobListing from "./JobListing";
import JobPosting from "./JobPosting";
import OtherListing from "./OtherListing";
import OtherPosting from "./OtherPosting";
import StayListing from "./StayListing";
import StayPosting from "./StayPosting";

const DetailsAltPages = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("job");
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [listingType, setListingType] = useState("");
  const [isPosted, setIsPosted] = useState(false);

  const toggleModal = (title, type) => {
    setModalTitle(title);
    setListingType(type);
    setModal(!modal);
  };
  //   const { messages } = intl;

  const toggleModalState = () => {
    setModal(false);
    setIsPosted(!isPosted);
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveTab(path === "listing" ? "all" : path);
  }, [location]);

  const changeTab = (tab) => {
    setActiveTab(tab);
    history.push(`/app/listing${tab === "all" ? "" : `/${tab}`}`);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12" className="mx-auto" style={{ maxWidth: "900px" }}>
          <h1>Listing</h1>
          <div className="text-zero top-right-button-container">
            {activeTab === "all" && (
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="primary"
                  size="sm"
                  outline
                  className="top-right-button top-right-button-single"
                >
                  Create Listing
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => toggleModal("Create a job List", "job")}
                  >
                    Create a Job list
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => toggleModal("Create a Stay list", "stay")}
                  >
                    Create a Stay list
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => toggleModal("Create a other list", "others")}
                  >
                    Create a other list
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            {activeTab === "job" && (
              <Button
                outline
                color="primary"
                onClick={() => toggleModal("Create a job List", "job")}
              >
                Create a job list
              </Button>
            )}
            {activeTab === "stay" && (
              <Button
                outline
                color="primary"
                onClick={() => toggleModal("Create a Stay list", "stay")}
              >
                Create a stay list
              </Button>
            )}
            {activeTab === "others" && (
              <Button
                outline
                color="primary"
                onClick={() => toggleModal("Create a other list", "others")}
              >
                Create a other list
              </Button>
            )}
          </div>

          {/* <Breadcrumb match={match} /> */}

          <Nav tabs className="separator-tabs ml-0 mb-5">
            {/* <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === "all",
                  "nav-link": true,
                })}
                onClick={() => changeTab("all")}
              >
                <i className="iconsminds-align-justify-all text-primary" />
                All
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === "job",
                  "nav-link": true,
                })}
                onClick={() => changeTab("job")}
              >
                <i className="iconsminds-management text-primary" />
                Job
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === "stay",
                  "nav-link": true,
                })}
                onClick={() => changeTab("stay")}
              >
                <i className="iconsminds-building text-primary" />
                Stay
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === "others",
                  "nav-link": true,
                })}
                onClick={() => changeTab("others")}
              >
                <i className="iconsminds-testimonal text-primary" />
                Others
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="all">
              <All />
            </TabPane>
            <TabPane tabId="job">
              <JobListing isPosted={isPosted} />
            </TabPane>
            <TabPane tabId="stay">
              <StayListing isPosted={isPosted} />
            </TabPane>
            <TabPane tabId="others">
              <OtherListing isPosted={isPosted} />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader className="pb-1" toggle={() => setModal(!modal)}>
          <h1 className="font-weight-semibold">{modalTitle}</h1>
        </ModalHeader>
        <ModalBody>
          {listingType === "job" && (
            <JobPosting closeModal={toggleModalState} />
          )}
          {listingType === "stay" && (
            <StayPosting closeModal={toggleModalState} />
          )}
          {/* {listingType === "others" && <OtherPosting />} */}
          {listingType === "others" && (
            <OtherPosting closeModal={toggleModalState} />
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default injectIntl(DetailsAltPages);
