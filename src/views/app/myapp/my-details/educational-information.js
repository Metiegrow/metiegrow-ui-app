import React, {
  // useEffect,
  useState,
} from 'react';
// import { myDetailsService } from 'services/services';
import DataListViewPersonal from 'containers/pages/DataListView-personal';
import { Collapse, Card, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import educationalInformationData from './data/educationalInformation-data';
import InputEducationalInformation from './input/educationalInformation-input';

const title = 'Educational Information';

const EducationalInformation = () => {
  const [toggle, setToggle] = useState(false);
  function onSetToggle() {
    setToggle((prevValue) => {
      return !prevValue;
    });
  }
  const { payload } = educationalInformationData;
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={title}>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center">
              <span className="d-flex ">
                <h1 style={{ marginRight: '1rem' }}>{title}</h1>
                {toggle && <InputEducationalInformation />}
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
            <div style={{ display: 'flex', flexWrap: 'wrap', flex: '0 0 73%' }}>
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

export default EducationalInformation;
