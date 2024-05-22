/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React,{useState} from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';


import { SliderTooltip } from 'components/common/SliderTooltips';



const SingleRangeSlider = () => {
  const [sliderValue, setSliderValue] = useState(1000);
  console.log(sliderValue);
  const handleSliderChange = (value) => {
    setSliderValue(value);
    
  };
  return (
    <Row>
      {/* <Colxx xxs="12" sm="6">
        <label>
          <IntlMessages id="form-components.double-slider" />
        </label>
        <RangeTooltip
          min={500}
          max={1500}
          className="mb-5"
          defaultValue={[800, 1200]}
          allowCross={false}
          pushable={100}
        />
      </Colxx> */}

      <Colxx xxs="12" sm="6">
       
        <SliderTooltip
          min={0}
          max={500000}
          defaultValue={sliderValue}
          className="mb-5"
          step={500}
          value={sliderValue} 
          onChange={handleSliderChange}
          
        />
      </Colxx>

      {/* <Colxx xxs="12" sm="6">
        <label>
          <IntlMessages id="form-components.double-slider" />
        </label>
        <RangeTooltip
          min={500}
          max={1500}
          className="mb-5"
          defaultValue={[800, 1200]}
          allowCross={false}
          pushable={100}
          vertical="true"
        />
      </Colxx> */}

      {/* <Colxx xxs="12" sm="6">
        <label>
          <IntlMessages id="form-components.single-slider" />
        </label>
        <SliderTooltip
          min={0}
          max={2500}
          defaultValue={1000}
          className="mb-5"
          step={500}
          vertical="true"
        />
      </Colxx> */}
    </Row>
  );
};

export default SingleRangeSlider;
