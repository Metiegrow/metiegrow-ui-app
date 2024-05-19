import React, { useState ,useEffect} from 'react';
import { adminRoot, baseUrl } from 'constants/defaultValues';
import axios from 'axios';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Col,
  Button,
 
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';


import classnames from 'classnames';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';


const LawyerTabCard = ({pid}) => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [packages,setPackages]=useState('');
  // const packageURL=`${baseUrl}/lawyerPackages`;
  
  // backend url 

    const packageURL=`${baseUrl}/api/lawyer/${pid}/package`
  useEffect(()=>{
   
   
  const LawyerPackage=async()=>{
    console.log(pid);
    try {
        const response = await axios.get(packageURL);
        const fetchedPackages = response.data;
        setPackages(fetchedPackages);
        

        if (fetchedPackages.length > 0) {
          setActiveFirstTab(fetchedPackages[0].id);
        }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
LawyerPackage();
},[])
//   const [activeSecondTab, setActiveSecondTab] = useState('1');
const history = useHistory()
const handleChatClick = () =>{
  history.push(`${adminRoot}/chat`)
}

  return (
    // <Row>
    //   <Colxx xxs="12">
       
    //     <Row>
    //       <Colxx xxs="12" xs="6" lg="10">
    //         <Card className="mb-4 ">
    //           <CardHeader>
    //             <Nav tabs className="card-header-tabs ">
    //               <NavItem>
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeFirstTab === '1',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveFirstTab('1');
    //                   }}
    //                 >
    //                   Basic
    //                 </NavLink>
    //               </NavItem>
    //               <NavItem>
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeFirstTab === '2',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveFirstTab('2');
    //                   }}
    //                 >
    //                   Standard
    //                 </NavLink>
    //               </NavItem>
    //               <NavItem>
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeFirstTab === '3',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveFirstTab('3');
    //                   }}
    //                 >
    //                   Premium
    //                 </NavLink>
    //               </NavItem>
    //               <NavItem>
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeFirstTab === '4',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveFirstTab('4');
    //                   }}
    //                 >
    //                   Premium1
    //                 </NavLink>
    //               </NavItem>
    //               <NavItem>
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeFirstTab === '5',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveFirstTab('5');
    //                   }}
    //                 >
    //                   Premium2
    //                 </NavLink>
    //               </NavItem>
    //             </Nav>
    //           </CardHeader>

    //           <TabContent activeTab={activeFirstTab}>
    //             <TabPane tabId="1">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                       <h2>₹4500</h2>
    //                       <h5>Basic package</h5>
    //                     </CardTitle>
                       
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //             <TabPane tabId="2">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                     <h2>₹8500</h2>
    //                       <h5>Standard package</h5>
    //                     </CardTitle>
                       
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //             <TabPane tabId="3">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                     <h2>₹12500</h2>
    //                       <h5>Premium package</h5>
    //                     </CardTitle>
                       
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //             <TabPane tabId="4">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                     <h2>₹12500</h2>
    //                       <h5>Premium package 1</h5>
    //                     </CardTitle>
                       
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //             <TabPane tabId="5">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                     <h2>₹15500</h2>
    //                       <h5>Premium package 2</h5>
    //                     </CardTitle>
                       
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //           </TabContent>
    //         </Card>
    //       </Colxx>

    //       {/* <Colxx xxs="12" xs="6" lg="3">
    //         <Card className="mb-4">
    //           <CardHeader className="pl-0 pr-0">
    //             <Nav tabs className=" card-header-tabs  ml-0 mr-0">
    //               <NavItem className="w-50 text-center">
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeSecondTab === '1',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveSecondTab('1');
    //                   }}
    //                 >
    //                   Tab 1
    //                 </NavLink>
    //               </NavItem>
    //               <NavItem className="w-50 text-center">
    //                 <NavLink
    //                   to="#"
    //                   location={{}}
    //                   className={classnames({
    //                     active: activeSecondTab === '2',
    //                     'nav-link': true,
    //                   })}
    //                   onClick={() => {
    //                     setActiveSecondTab('2');
    //                   }}
    //                 >
    //                   Tab 2
    //                 </NavLink>
    //               </NavItem>
    //             </Nav>
    //           </CardHeader>

    //           <TabContent activeTab={activeSecondTab}>
    //             <TabPane tabId="1">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                       Homemade Cheesecake with Fresh Berries and Mint
    //                     </CardTitle>
    //                     <Button outline size="sm" color="primary">
    //                       Edit
    //                     </Button>
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //             <TabPane tabId="2">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                       Wedding Cake with Flowers Macarons and Blueberries
    //                     </CardTitle>
    //                     <Button outline size="sm" color="primary">
    //                       Edit
    //                     </Button>
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //             <TabPane tabId="3">
    //               <Row>
    //                 <Colxx sm="12">
    //                   <CardBody>
    //                     <CardTitle className="mb-4">
    //                       Cheesecake with Chocolate Cookies and Cream Biscuits
    //                     </CardTitle>
    //                     <Button outline size="sm" color="primary">
    //                       Edit
    //                     </Button>
    //                   </CardBody>
    //                 </Colxx>
    //               </Row>
    //             </TabPane>
    //           </TabContent>
    //         </Card>
    //       </Colxx> */}
    //     </Row>
    //   </Colxx>
    // </Row>
    <Row>
    <Colxx xxs="12">
      <Row>
        <Colxx xxs="12" xs="10" lg="10">
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs">
                {packages&&packages.map((pack) => (
                  <NavItem key={pack.id}>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === pack.id,
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab(pack.id);
                      }}
                    >
                     <h6>{pack.serviceName}</h6> 
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </CardHeader>

            <TabContent activeTab={activeFirstTab}>
              {packages&&packages.map((pack) => (
                <TabPane key={pack.id} tabId={pack.id}>
                  <Row>
                    <Col sm="12">
                      <CardBody>
                        <CardTitle className="mb-4">
                          <h2>₹ {pack.amount}</h2>
                          <h5>{pack.serviceName}</h5>
                          <p className='text-muted'>{pack.description}</p>
                          <Button className='mt-4 text-one' size='lg' outline color='primary' onClick={handleChatClick}>Contact</Button>
                        </CardTitle>
                      </CardBody>
                    </Col>
                  </Row>
                </TabPane>
              ))}
            </TabContent>
          </Card>
        </Colxx>
      </Row>
    </Colxx>
  </Row>
  );
};

export default LawyerTabCard;
