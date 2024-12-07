import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";
import StayPosting from "./StayPosting";

const MyStayListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteStayPost, setDeleteStayPost] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);
  const [interestUsersModal, setInterestedUsersModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [jobId, setJobId] = useState(null);
  const history = useHistory();

  // console.log(data)
  const toggleModalState = () => {
    setModal(false);
    setSelectedStay(null);
  };
  //   const data1 = [
  //     {
  //       title: "Title 1",
  //       category: "Job Listing",
  //       postedOn: 1720189649645,
  //       badgeColor: "success",
  //       badgeText: "Published",
  //       link: "#",
  //       interestedCount: "6",
  //     },
  //     {
  //       title: "Title 2",
  //       category: "Stay Listing",
  //       postedOn: 1720276049645,
  //       badgeColor: "success",
  //       badgeText: "Published",
  //       link: "#",
  //       interestedCount: "1",
  //     },
  //     {
  //       title: "Title 3",
  //       category: "Other Listing",
  //       postedOn: 1720362449645,
  //       badgeColor: "primary",
  //       badgeText: "Processed",
  //       link: "#",
  //       interestedCount: "2",
  //     },
  //     {
  //       title: "Title 4",
  //       category: "Stay Listing",
  //       postedOn: 1720448849645,
  //       badgeColor: "success",
  //       badgeText: "Published",
  //       link: "#",
  //       interestedCount: "4",
  //     },
  //   ];
  const url = `${baseUrl}/api/posts/stay-post/mystayrooms`;

  useEffect(() => {
    const fetchMyStayListingData = async () => {
      try {
        const response = await axios.get(url);
        setPagination(response.data.paginationMeta);
        setData(response.data.stayrooms);
        // Assuming there's at least one job listing
        if (response.data.stayrooms.length > 0) {
          setJobId(response.data.stayrooms[0].id); // Set the job ID from the first job listing
        }
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        if (error.response) {
          console.error("Response error:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);
      }
    };

    fetchMyStayListingData();
  }, [deleteStayPost, modal]);

  const deletePost = async (id) => {
    const stayDeleteUrl = `${baseUrl}/api/posts/stay-post/${id}`;
    try {
      const response = await axios.delete(stayDeleteUrl);
      setDeleteStayPost(!deleteStayPost);
      ToasterComponent("success", response.data.statuses);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("There was an error!", error);
      }
    }
  };

  const handleEditStay = async (stayData) => {
    try {
      const token = localStorage.getItem("tokenRes");
      const editUrl = `${baseUrl}/api/posts/stay-post/`;
      const response = await axios.put(editUrl, stayData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ToasterComponent("success", response.data.statuses);

      setModal(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.statuses
      ) {
        ToasterComponent("error", error.response.data.statuses);
      } else {
        console.error("Error editing job:", error);
      }
    }
  };

  const handleMyStayListDelete = (id) => deletePost(id);
  const handleEditButtonClick = (stay) => {
    setSelectedStay(stay);
    setModal(true);
  };

  const interestedPeopleUrl = `${baseUrl}/api/posts/stay-post/interested-users/${jobId}`;

  const handleModalToggle = async () => {
    if (!interestUsersModal) {
      // Fetch users only if modal is being opened
      try {
        const response = await axios.get(interestedPeopleUrl);
        setUsers(response.data.interestedUsers);
      } catch (error) {
        console.error("Error fetching interested users:", error);
      }
    }
    setInterestedUsersModal(!interestUsersModal); // Toggle modal visibility
  };

  const handleUserClick = (user) => {
    const lowerCaseRole = user.role.toLowerCase();
    // history.push(`/app/${lowerCaseRole}profile/${user.userId}`);
    if (lowerCaseRole === "alumni") {
      history.push(`/app/alumni/profile/${user.userId}`);
    } else if (lowerCaseRole === "user") {
      history.push(`/app/user/profile/${user.userId}`);
    } else {
      history.push(`/app/${lowerCaseRole}profile/${user.userId}`);
    }
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      {!data.length > 0 ? (
        <Card className="d-flex justify-content-center align-items-center ">
          <h2 className="mt-4 mb-4">There are no posts available</h2>
        </Card>
      ) : (
        <Colxx xxs="12" className="mb-3">
          {/* <h1>My Listing</h1> */}
          {data.map((item) => (
            <Card key={item} className="mb-4">
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink
                    to={`/app/listing/stay/view/${item.id}`}
                    className="w-30 w-sm-100"
                  >
                    <p className="list-item-heading mb-1 truncate">
                      {item.title}
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-small w-30 w-sm-100">
                    <i className="simple-icon-layers" /> {item.apartmentType}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    <i className="simple-icon-clock" />{" "}
                    <TimestampConverter
                      timeStamp={item.postedOn}
                      format="datetime"
                    />
                  </p>
                  {/* <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <i className="iconsminds-like" />{" "}{item.interestedCount}
              </p> */}
                  {/* <div className="w-15 w-sm-100">
                <Badge color={item.badgeColor} pill>
                  {item.badgeText}
                </Badge>
              </div> */}
                  <div
                    role="button"
                    tabIndex={0}
                    className="mb-1 text-muted text-small w-15 w-sm-100"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleModalToggle();
                      }
                    }}
                    onClick={handleModalToggle}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="iconsminds-like" /> {item.interestedCount}
                  </div>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  {/* <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              /> */}
                  <Button
                    outline
                    color="primary"
                    className="icon-button"
                    onClick={() => handleEditButtonClick(item)}
                  >
                    <i className="simple-icon-pencil" />
                  </Button>
                  <Button
                    onClick={() => handleMyStayListDelete(item.id)}
                    outline
                    color="primary"
                    className="icon-button ml-2"
                  >
                    <i className="simple-icon-trash" />
                  </Button>
                </div>
              </div>
              <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader className="pb-1" toggle={() => setModal(!modal)}>
                  <h1 className="font-weight-semibold">Edit</h1>
                </ModalHeader>
                <ModalBody>
                  <StayPosting
                    closeModal={toggleModalState}
                    initialData={selectedStay}
                    onEdit={handleEditStay}
                  />
                </ModalBody>
              </Modal>
            </Card>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPage={pagination.totalPage}
            onChangePage={(i) => setCurrentPage(i)}
            lastIsActive={pagination.first}
            firstIsActive={pagination.last}
          />
        </Colxx>
      )}

      {/* modal to display interested people start */}
      <Modal isOpen={interestUsersModal} toggle={handleModalToggle}>
        <ModalHeader className="p-3" toggle={handleModalToggle}>
          Interested
        </ModalHeader>
        <ModalBody className="p-3">
          <ListGroup flush>
            {users?.length > 0 ? (
              users.map((datas) => (
                <ListGroupItem
                  key={datas.userId}
                  tag="a"
                  style={{ cursor: "pointer" }}
                  // href={`/app/mentorprofile/${data.id}`}
                  onClick={() => handleUserClick(datas)}
                >
                  {datas.userName}
                </ListGroupItem>
              ))
            ) : (
              <p>No interested persons yet.</p>
            )}
          </ListGroup>
        </ModalBody>
      </Modal>
      {/* modal to display interested people end */}
    </>
  );
};

export default MyStayListing;
