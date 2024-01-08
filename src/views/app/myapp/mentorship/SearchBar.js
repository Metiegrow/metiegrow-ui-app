import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import React ,{useState,useEffect}from 'react';


const SearchBar = () => {
    const [searchKey, setSearchKey] = useState('');
    const url=`${baseUrl}/mentor/cards`;
    const[mentordetails,setMentorDetails]=useState([]);
    useEffect(()=>{
      const mentorCardDetails = async () => {
        try {
          const response = await axios.get(url);
          setMentorDetails(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      mentorCardDetails();
    },[])
  return (
    <div>
       <div className="pt-4 pr-4 pl-4 pb-0">
        <div className="form-group">
          <input
            type="text"
            className="form-control rounded col-12 col-lg-6 col-md-6"
            placeholder='Search by skill or job title'
            // placeholder={messages['menu.search']}
            value={searchKey}
            onChange={(e) =>setSearchKey(e.target.value)}
          />
        </div>
        <div>
        {mentordetails
    .filter((val) => {
        if (searchKey === "" || val.jobTitle.toLowerCase().includes(searchKey.toLowerCase())) {
            return true;
        }
        return false;
    })
    .map((val) => {
        return (
            <div key={val.id}>
                <p>{val.jobTitle}</p>
            </div>
        );
    })}
        </div>
      </div>

    </div>
  );
}

export default SearchBar;
