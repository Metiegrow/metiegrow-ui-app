import classnames from "classnames";
import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  //   Card,
  //   CardBody,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
// import Rating from 'components/common/Rating';

// import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from "components/common/CustomBootstrap";

// import JobPosting from "./JobPosting";
// import StayPosting from "./StayPosting";
// import OtherPosting from "./OtherPosting";
import MyJobListing from "./MyJobListing";
import MyOtherListing from "./MyOtherListing";
import MyStayListing from "./MyStayListing";

const MyListing = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("job");
  // const [modal, setModal] = useState(false);
  // const [modalTitle, setModalTitle] = useState("");
  // const [listingType, setListingType] = useState("");
  // const [isPosted,setIsPosted] = useState(false)

  // const toggleModal = (title, type) => {
  //   setModalTitle(title);
  //   setListingType(type);
  //   setModal(!modal);
  // };
  //   const { messages } = intl;

  // const toggleModalState = () => {
  //   setModal(false);
  //   setIsPosted(!isPosted);
  // };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveTab(path === "mylisting" ? "job" : path);
  }, [location]);

  const changeTab = (tab) => {
    setActiveTab(tab);
    history.push(`/app/mylisting${tab === "job" ? "" : `/${tab}`}`);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12" className="mx-auto" style={{ maxWidth: "900px" }}>
          <h1>My listing</h1>

          {/* <Breadcrumb match={match} /> */}

          <Nav tabs className="separator-tabs ml-0 mb-5">
            {/* <Button
                outline
                color="primary"
                onClick={() => toggleModal("Create a job List", "job")}
              >
                Edit
              </Button> */}
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
            <TabPane tabId="job">
              <MyJobListing />
            </TabPane>
            <TabPane tabId="stay">
              <MyStayListing />
            </TabPane>
            <TabPane tabId="others">
              <MyOtherListing />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
      {/* <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader className="pb-1" toggle={() => setModal(!modal)}>
          <h1 className="font-weight-semibold">{modalTitle}</h1>
        </ModalHeader>
        <ModalBody>
          {listingType === "job" && <JobPosting closeModal={toggleModalState}/>}
          {listingType === "stay" && <StayPosting closeModal={toggleModalState}/>}
          {listingType === "others" && <OtherPosting />}
          {listingType === "others" && <OtherPosting closeModal={toggleModalState} />}

        </ModalBody>
      </Modal> */}
    </>
  );
};
export default injectIntl(MyListing);
