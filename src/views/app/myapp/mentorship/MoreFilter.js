import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import React ,{useState,useEffect}from 'react';
import {  CustomInput,  Label } from 'reactstrap';


const MoreFilter = () => {
    const url=`${baseUrl}/countries`;
  const[country,setCountry]=useState([]);
//   const [inputkey,setInputKey]=useState('')

  useEffect(()=>{
    const CountryDetails = async () => {
      try {
        const response = await axios.get(url);
        setCountry(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    CountryDetails();
  },[])
  return (
    <div>
      <div>
       
        <div>
        <h1>
            Locations
        </h1>
       
        {/* <FormGroup className='d-flex   ' >
                  <CustomInput
            type="checkbox"
            id=""
            
          />
          <Label>United States</Label>
                  </FormGroup>
                 */}
    
       
       {/* {country.map((countryData) => (
       
        <FormGroup key={countryData} className='d-flex   ' >
                  <CustomInput
            type="checkbox"
            id=""
            
          />
             {Object.values(countryData).map((countryName) => (
            <Label key={countryData}>{countryName}</Label>
          ))}
       
                  </FormGroup>
                
       
       
      ))} */}
      {/* {country.map((countryData) => (
  <FormGroup key={countryData} className='d-flex'>
    <CustomInput
      type="checkbox"
      id="input" // Use a unique identifier for the checkbox id
    />
    {Object.values(countryData).map((countryName) => (
      <Label key={countryData} htmlFor='input'>{countryName}</Label>
    ))}
  </FormGroup>
))} */}
{/*  */}
{country.map((countryData) => (
  Object.values(countryData).map((countryName) => (
    <div key={countryName} className='d-flex'>
      <CustomInput
        type="checkbox"
        id={countryName} // Use a unique identifier for the checkbox id
      />
      <Label htmlFor={countryName}>{countryName}</Label>
    </div>
  ))
))}


        </div>
      </div>
    </div>
  );
}

export default MoreFilter;
