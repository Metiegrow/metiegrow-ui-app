import React from "react";
import { Card, Badge, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";
import TimestampConverter from "../Calculation/TimestampConverter";

const MyListing = () => {
  const data = [
    {
      title: "Title 1",
      category: "Job Listing",
      postedOn: 1720189649645,
      badgeColor: "success",
      badgeText: "Published",
      link: "#",
      interestedCount: "6",
    },
    {
      title: "Title 2",
      category: "Stay Listing",
      postedOn: 1720276049645,
      badgeColor: "success",
      badgeText: "Published",
      link: "#",
      interestedCount: "1",
    },
    {
      title: "Title 3",
      category: "Other Listing",
      postedOn: 1720362449645,
      badgeColor: "primary",
      badgeText: "Processed",
      link: "#",
      interestedCount: "2",
    },
    {
      title: "Title 4",
      category: "Stay Listing",
      postedOn: 1720448849645,
      badgeColor: "success",
      badgeText: "Published",
      link: "#",
      interestedCount: "4",
    },
  ];

  return (
    <Colxx xxs="12" className="mb-3">
      <h1>My Listing</h1>
      {data.map((item) => (
        <Card key={item} className="mb-4">
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={item.link} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.title}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
               <i className="simple-icon-layers" /> {" "} {item.category}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
               <i className="simple-icon-clock" />{" "}<TimestampConverter timeStamp={item.postedOn} format="datetime"  />
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <i className="iconsminds-like" />{" "}{item.interestedCount}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={item.badgeColor} pill>
                  {item.badgeText}
                </Badge>
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
              <Button outline color="primary" className="icon-button"><i className="simple-icon-pencil" /></Button>
              <Button outline color="primary" className="icon-button ml-2"><i className="simple-icon-trash" /></Button>
            </div>
          </div>
        </Card>
      ))}
    </Colxx>
  );
};

export default MyListing;
