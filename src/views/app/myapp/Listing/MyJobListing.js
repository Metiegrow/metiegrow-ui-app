import React, { useEffect, useState } from "react";
import { Card, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import axios from "axios";
import Pagination from "containers/pages/Pagination";
import { baseUrl } from "constants/defaultValues";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";

const MyJobListing = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteJobPost, setDeleteJobPost] = useState(false);

    console.log(data)

  const url = `${baseUrl}/api/posts/job-post/myjobs`; 

  useEffect(() => {
    const fetchMyJobListingData = async () => {

      try {
        const response = await axios.get(url);
        setPagination(response.data.pagination)
        setData(response.data.jobLists);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        if (error.response) {
          console.error('Response error:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    fetchMyJobListingData();
  }, [deleteJobPost]); 

  const deletePost = async (id) => {
    const stayDeleteUrl = `${baseUrl}/api/posts/job-post/${id}` 
    try {
     const response = await axios.delete(stayDeleteUrl);
      setDeleteJobPost(!deleteJobPost);
      ToasterComponent('success', response.data.statuses);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  

  const handleMyJobListDelete = (id) => deletePost(id);

  return !isLoaded ? (
    <div className="loading" />
  ) : (<>
  {!data.length > 0 ? (
    <Card className="d-flex justify-content-center align-items-center "><h2 className="mt-4 mb-4">There are no posts available</h2></Card>
  ) : (
    <Colxx xxs="12" className="mb-3">
      {/* <h1>My Listing</h1> */}
      {data.map((item) => (
        <Card key={item} className="mb-4">
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`/app/listing/job/view/${item.id}`} className="w-30 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.title}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
               <i className="simple-icon-layers" /> {" "} {item.jobTitle    }
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
               <i className="simple-icon-clock" />{" "}<TimestampConverter timeStamp={item.postedOn} format="datetime"  />
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <i className="iconsminds-like" />{" "}{item.interestedCount}
              </p>
              {/* <div className="w-15 w-sm-100">
                <Badge color={item.badgeColor} pill>
                  {item.badgeText}
                </Badge>
              </div> */}
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
              <Button outline color="primary" className="icon-button"><i className="simple-icon-pencil" /></Button>
              <Button onClick={() => handleMyJobListDelete(item.id)} outline color="primary" className="icon-button ml-2"><i className="simple-icon-trash" /></Button>
            </div>
          </div>
        </Card>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPage={pagination.totalPage}
        onChangePage={(i) => setCurrentPage(i)}
        lastIsActive = {pagination.first}
        firstIsActive = {pagination.last}
      />
    </Colxx>
)}
</>
);
};

export default MyJobListing;
