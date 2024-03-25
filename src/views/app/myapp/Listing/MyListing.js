import React from "react";
import { Card, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "components/common/CustomBootstrap";

const MyListing = () => {
  const data = [
    {
      title: "Title 1",
      category: "Job Listing",
      postedOn: "postedOn 1",
      badgeColor: "primary",
      badgeText: "Processed",
      link: "#",
      interestedCount: "6",
    },
    {
      title: "Title 2",
      category: "Stay Listing",
      postedOn: "postedOn 2",
      badgeColor: "success",
      badgeText: "Completed",
      link: "#",
      interestedCount: "1",
    },
    {
      title: "Title 3",
      category: "Other Listing",
      postedOn: "postedOn 1",
      badgeColor: "primary",
      badgeText: "Processed",
      link: "#",
      interestedCount: "2",
    },
    {
      title: "Title 4",
      category: "Stay Listing",
      postedOn: "postedOn 2",
      badgeColor: "success",
      badgeText: "Completed",
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
                {item.category}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.postedOn}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.interestedCount}
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
            </div>
          </div>
        </Card>
      ))}
    </Colxx>
  );
};

export default MyListing;
