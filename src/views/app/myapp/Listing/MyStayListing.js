import React, { useEffect, useState } from "react";
import { Card, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import axios from "axios";
import Pagination from "containers/pages/Pagination";
import { baseUrl } from "constants/defaultValues";
import TimestampConverter from "../Calculation/TimestampConverter";
import ToasterComponent from "../notifications/ToasterComponent";

const MyStayListing = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteStayPost, setDeleteStayPost] = useState(false);

    console.log(data)
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
        setPagination(response.data.paginationMeta)
        setData(response.data.stayrooms);
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

    fetchMyStayListingData();
  }, [deleteStayPost]); 

  const deletePost = async (id) => {
    const stayDeleteUrl = `${baseUrl}/api/posts/stay-post/${id}` 
    try {
     const response = await axios.delete(stayDeleteUrl);
      setDeleteStayPost(!deleteStayPost);
      ToasterComponent('success', response.data.statuses);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  

  const handleMyStayListDelete = (id) => deletePost(id);

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
              <NavLink to={`/app/listing/stay/view/${item.id}`} className="w-30 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.title}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
               <i className="simple-icon-layers" /> {" "} {item.apartmentType}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
               <i className="simple-icon-clock" />{" "}<TimestampConverter timeStamp={item.postedOn} format="datetime"  />
              </p>
              {/* <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <i className="iconsminds-like" />{" "}{item.interestedCount}
              </p> */}
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
              <Button onClick={() => handleMyStayListDelete(item.id)} outline color="primary" className="icon-button ml-2"><i className="simple-icon-trash" /></Button>
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

export default MyStayListing;
