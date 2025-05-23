import React, { useState } from 'react';
import DataListViewPersonal from 'containers/pages/DataListView-personal';
import { Collapse, Card, Button } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import personalInformationData from './data/personalInformation-data';
import InputPersonalInformation from './input/personalInformation-input';

const title = 'Personal Information';

const PersonalInformation = () => {
  const [toggle, setToggle] = useState(false);
  function onSetToggle() {
    setToggle((prevValue) => {
      return !prevValue;
    });
  }
  const { payload } = personalInformationData;

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={title}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <span className="d-flex ">
                <h1 style={{ marginRight: '1rem' }}>{title}</h1>

                {toggle && <InputPersonalInformation />}
              </span>
            </div>
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
          <Collapse isOpen={toggle}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {payload.map((product) => {
                return (
                  <DataListViewPersonal
                    key={product.id}
                    product={product}
                    isSelect={() => {
                      console.log('isSelect ran');
                    }}
                    onCheckItem={() => {
                      console.log('onCheckitem ran');
                    }}
                    collect={() => {
                      console.log('collect ran');
                    }}
                  />
                );
              })}
            </div>
          </Collapse>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};
export default PersonalInformation;
