import React from 'react';
import { Card } from 'reactstrap'; // import CustomInput for using checkbox
// import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DataListViewpersonal = ({
  product,
  onCheckItem,
  // isSelect, collect, onCheckItem
}) => {
  return (
    <Colxx xs="4" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          style={{ boxShadow: 'none' }}
          className={classnames('d-flex flex-row', {
            // active: isSelect,
          })}
        >
          <p
            style={{ paddingLeft: '5%' }}
            className="list-item-heading mb-1 truncate warp"
          >
            {`${product.title}    :   ${product.value}`}
          </p>

          {/* <div className="pl-2 d-flex flex-grow-1 min-width-zero"> */}
          {/* <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"> */}
          {/* <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
              </NavLink> */}
          {/* <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {product.category}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {product.date}
            </p> */}
          {/* <p className="w-15 w-sm-100 ">
              {product.value}
              <Badge color={product.statusColor} pill>
              </Badge>
              </p> 
             */}
          {/* </div> */}
          {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${product.id}`}
              checked={isSelect}
              onChange={() => {}}
              label=""
              />
            </div> */}
          {/* </div> */}
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListViewpersonal);
