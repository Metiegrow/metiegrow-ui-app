import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";
import OtherPosting from "./OtherPosting";



const MyOtherListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteStayPost, setDeleteStayPost] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedOther, setSelectedOther] = useState(null);


  // console.log(data)
  const url = `${baseUrl}/api/posts/other-post/myotherposts`;

  useEffect(() => {
    const fetchMyOtherListingData = async () => {
      try {
        const response = await axios.get(url);
        setPagination(response.data.paginationMeta);
        setData(response.data.otherposts);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        if (error.response) {
          console.error("Response error:", error.response);
        }
      }
    };

    fetchMyOtherListingData();
  }, [deleteStayPost,modal]);

  const handleEditOthers = async (othersData) => {
    try {
      const token = localStorage.getItem("tokenRes");
      const editUrl = `${baseUrl}/api/posts/other-post/`; 
      const response = await axios.put(editUrl, othersData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ToasterComponent('success', response.data.statuses);
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



  const deletePost = async (id) => {
    const otherDeleteUrl = `${baseUrl}/api/posts/other-post/${id}`;
    try {
      const response = await axios.delete(otherDeleteUrl);
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

  const handleMyOtherListDelete = (id) => deletePost(id);
  const handleEditButtonClick = (other) => {
    setSelectedOther(other);
    setModal(true);
  };

  

  const toggleModalState = () => {
    setModal(false);
    setSelectedOther(null);
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
          {data.map((item) => (
            <Card key={item} className="mb-4">
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink
                    to={`/app/listing/other/view/${item.id}`}
                    className="w-30 w-sm-100"
                  >
                    <p className="list-item-heading mb-1 truncate">
                      {item.title}
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-small w-30 w-sm-100">
                    <i className="simple-icon-layers" /> {item.job}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    <i className="simple-icon-clock" />{" "}
                    <TimestampConverter
                      timeStamp={item.postedOn}
                      format="datetime"
                    />
                  </p>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <Button
                    onClick={() => handleEditButtonClick(item)}
                    outline
                    color="primary"
                    className="icon-button"
                  >
                    <i className="simple-icon-pencil" />
                  </Button>
                  <Button
                    onClick={() => handleMyOtherListDelete(item.id)}
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
        {/* <JobPosting closeModal={toggleModalState}  /> */}
        <OtherPosting
          closeModal={toggleModalState}
          initialData={selectedOther}
          onEdit={handleEditOthers}
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
    </>
  );
};

export default MyOtherListing;
