import React, { useState } from 'react';
// import DataListViewPersonal from 'containers/pages/DataListView-personal';
import { Collapse, Card, Col, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import classNames from 'classnames';
import SupportingDocumentsData from './data/supporting-documents-data';
import UploadData from './upload-data';

const title = 'Supporting Documents';
const { payload } = SupportingDocumentsData;

const SupportingDocuments = () => {
  const [toggle, setToggle] = useState(false);

  function onSetToggle() {
    setToggle((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={title}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <span className="d-flex ">
                <p
                  style={{ marginRight: '1rem' }}
                  className="h3 mb-1 truncate align-self-end"
                >
                  {title}
                </p>
                {toggle && <UploadData MenuOptions={payload} />}
              </span>
              <div className="align-self-center">
                <Button
                  color="link"
                  size="lg"
                  onClick={() => {
                    onSetToggle();
                  }}
                >
                  <i
                    className={
                      toggle === !false
                        ? 'iconsminds-arrow-up'
                        : 'iconsminds-arrow-down'
                    }
                  />
                </Button>
              </div>
            </div>
          </div>

          <Collapse isOpen={toggle}>
            <div
              style={{ padding: '5px' }}
              className="d-flex justify-content-end mr-3 pb-3  "
            >
              <Button>List Documents</Button>
            </div>
            <div>
              {payload.map((product) => {
                return (
                  <div key={product.id}>
                    <Colxx xs="12" className="mb-5">
                      <ContextMenuTrigger id="menu_id" data={product.id}>
                        <Card
                          onClick={(event) => console.log(event)}
                          style={{ boxShadow: 'none' }}
                          className={classNames('d-flex flex-row', {})}
                        >
                          <Card className="w-100 d-flex flex-row">
                            <Col xs="4">
                              <h3
                                style={{ padding: '5px', justifySelf: 'start' }}
                              >
                                {`${product.title}    :   ${product.value}`}
                              </h3>
                            </Col>
                            <Col xs="4">
                              <p
                                style={{
                                  margin: '10px 0',
                                }}
                                className="text-center"
                              >
                                {product.date}
                              </p>
                            </Col>
                            <Col xs="4" className="d-flex flex-row-reverse">
                              <Button
                                style={{
                                  maxWidth: 'fit-content',
                                }}
                                outline
                                color="info"
                              >
                                <i className="iconsminds-download" />
                              </Button>
                            </Col>
                          </Card>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  </div>
                );

                // return (
                //   <DataListViewPersonal
                //     key={product.id}
                //     product={product}
                //     isSelect={() => {
                //       console.log('isSelect ran');
                //     }}
                //     onCheckItem={() => {
                //       console.log('onCheckitem ran');
                //     }}
                //     collect={() => {
                //       console.log('collect ran');
                //     }}
                //   />
                // );
              })}
            </div>
          </Collapse>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );

  // return (
  //   <Colxx xxs="12" className="mb-3">
  //     <ContextMenuTrigger id="menu_id" data={title}>
  //       <Card
  //         onClick={() => {
  //           onSetToggle();
  //         }}
  //       >
  //         <div className="pl-2 d-flex flex-grow-1 min-width-zero">
  //           <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
  //             <h1 className="list-item-heading mb-1 truncate">{title}</h1>
  //           </div>
  //         </div>
  //         <Collapse isOpen={toggle}>
  //           <div style={{ display: 'flex', flexWrap: 'wrap', flex: '0 0 73%' }}>
  //             {payload.map((product) => {
  //               return (
  //                 <DataListViewPersonal
  //                   key={product.id}
  //                   product={product}
  //                   isSelect={() => {
  //                     console.log('isSelect ran');
  //                   }}
  //                   onCheckItem={() => {
  //                     console.log('onCheckitem ran');
  //                   }}
  //                   collect={() => {
  //                     console.log('collect ran');
  //                   }}
  //                 />
  //               );
  //             })}
  //           </div>
  //         </Collapse>
  //       </Card>
  //     </ContextMenuTrigger>
  //   </Colxx>
  // );
};
export default SupportingDocuments;
