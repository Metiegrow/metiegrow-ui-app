import axios from "axios";
import { Colxx } from "components/common/CustomBootstrap";
import { baseUrl } from "constants/defaultValues";
import Pagination from "containers/pages/Pagination";
import { useEffect, useState } from "react";
import { Card, CardBody, NavLink, Row } from "reactstrap";

const MyQandA = () => {
  const [myanswers, setMyAnswers] = useState("");
  const [myquestions, setMyQuestions] = useState("");
  // const[activities,setActivities]=useState('');
  const url = `${baseUrl}/api/mentor/myAnswers`;
  const url1 = `${baseUrl}/api/mentee/myQuestions`;
  // const url2=`${baseUrl}/myActivities`;
  const [currentPage, setCurrentPage] = useState(0);
  // const [totalPage] = useState(4);
  // const [currentPage1, setCurrentPage1] = useState(0);
  // const [totalPage1] = useState(4);
  const [pagination, setPagination] = useState("");

  useEffect(() => {
    const MyAnswers = async () => {
      try {
        const response = await axios.get(
          `${url}?_page=${currentPage}&_limit=5`
        );
        // const response = await axios.get(url);
        setMyAnswers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    MyAnswers();
    const MyQuestions = async () => {
      try {
        const response = await axios.get(
          `${url1}?_page=${currentPage}&_size=3`
        );
        // const response = await axios.get(url1);
        // const response = await axios.get(url1);
        // setMyQuestions(response.data.data.myQuestions);
        setMyQuestions(response.data.data);

        setPagination(response.data.paginationMeta);
        console.log(response.data.paginationMeta);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    MyQuestions();
  }, []);

  return (
    <div>
      <Colxx lg="8" className="mx-auto">
        <Row>
          {/* Pass myquestions array */}
          <Colxx>
            <h1 className="text-center text-large w-100 py-2">
              My questions and answers
            </h1>
            <div>
              <div className="mt-2">
                <div className="d-flex justify-content-between">
                  <h2 className="font-weight-semibold">Questions</h2>
                </div>

                {myquestions && myquestions?.totalQuestions === null ? (
                  <></>
                ) : (
                  <h3 className="my-2">
                    View all
                    <span className="font-weight-bold px-1">
                      {myquestions.totalQuestions}
                    </span>
                    questions
                  </h3>
                )}
              </div>

              <div className="">
                <div className="">
                  {myquestions &&
                  myquestions.questions &&
                  myquestions.questions.length > 0 ? (
                    myquestions.questions.map((qs) => {
                      const qdate = new Date(qs.timestamp);
                      const qsdateformat = `${qdate.getDate()}/${
                        qdate.getMonth() + 1
                      }/${qdate.getFullYear()}`;
                      return (
                        <Card key={qs.questionId} className="mb-3">
                          <NavLink
                            href={`/app/questions/${qs.questionId}`}
                            className="d-flex justify-content-between"
                          >
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <NavLink
                                  href={`/app/questions/${qs.questionId}`}
                                  className="d-flex justify-content-between"
                                >
                                  <h3>{qs.question}</h3>
                                </NavLink>
                                <h3>{qsdateformat}</h3>
                              </div>
                            </CardBody>
                          </NavLink>
                        </Card>
                      );
                    })
                  ) : (
                    <Card>
                      <CardBody>
                        <h3>No questions</h3>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </Colxx>
        </Row>
        {/* <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => setCurrentPage(i)}
      /> */}
        <Pagination
          currentPage={pagination.pageNumber}
          totalPage={pagination.totalPage}
          onChangePage={(i) => setCurrentPage(i)}
        />
        <hr />
        <Row>
          <Colxx xxs="12">
            <div>
              <div className="mt-4">
                <div className="d-flex justify-content-between">
                  <h2 className="font-weight-semibold">Answers</h2>
                </div>
                {/* {myanswers&&myanswers.map((num)=>{
       return(
        <div key={num.totalAnswers}>
        <h3>view all <span className="font-weight-semibold">{num.totalAnswers}</span> answers</h3>
    
        </div>
       )
      })} */}
                {/* <h3 className='my-2'>view all <span className="font-weight-bold">{myanswers.totalAnswers}</span> answers</h3> */}

                {myanswers?.totalAnswers != null ? (
                  <h3 className="my-2">
                    View all
                    <span className="font-weight-bold px-1">
                      {myanswers.totalAnswers}
                    </span>
                    answers
                  </h3>
                ) : (
                  <></>
                )}
                {/* {activities.myAnswers&&activities.myAnswers.map((num)=>{
       return(
        <div key={num.totalAnswers}>
        <h3>view all <span className="font-weight-semibold">{num.totalAnswers}</span> answers</h3>
    
        </div>
       )
      })} */}
              </div>
              {/* <Card className='mt-3'>
        <CardBody>
         <div className=''>
         <div className=''>
         {myanswers&&myanswers.map((ans)=>{
         
            return (
              
              <div key={ans.totalAnswers}>
                
                <div className='' key={ans.totalAnswers}>
           
              <h3>{ans.answers.map((s)=>{
                const ansdate=new Date(s.timestamp);
                const ansdateformat = `${ansdate.getDate()}/${ansdate.getMonth()+1}/${ansdate.getFullYear()}`;
                return (
                  <div key={s.questionId}>
                 
                    <div className='d-flex   justify-content-between'>
                    <NavLink href={`/app/questions/${s.questionId}`} className='d-flex justify-content-between'>
                    <h3>{s.question}</h3>
              
                   
                    </NavLink>
                  
                    <h3>{ansdateformat}</h3>
                   
                   
                    </div>
                   <hr/>
                  
                 
                  </div>
                )
              })}</h3>
             
         </div>
               
              </div>
            
            )
          })}
          
        
         </div>
         
         </div>
         
        </CardBody>
       </Card> */}
              {myanswers &&
              myanswers.questions &&
              myanswers.questions.length > 0 ? (
                myanswers.questions.map((qs) => {
                  const qdate = new Date(qs.timestamp);
                  const qsdateformat = `${qdate.getDate()}/${
                    qdate.getMonth() + 1
                  }/${qdate.getFullYear()}`;
                  return (
                    <Card key={qs.questionId} className="mb-3">
                      <NavLink
                        href={`/app/questions/${qs.questionId}`}
                        className="d-flex justify-content-between"
                      >
                        <CardBody>
                          <div className="d-flex justify-content-between">
                            <h3>{qs.question}</h3>
                            <h3>{qsdateformat}</h3>
                          </div>
                        </CardBody>
                      </NavLink>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardBody>
                    <h3>No answers</h3>
                  </CardBody>
                </Card>
              )}
            </div>
          </Colxx>
        </Row>
      </Colxx>

      {/* <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => setCurrentPage(i)}
      /> */}
      {/* <Pagination
        currentPage={currentPage1}
        totalPage={totalPage1}
        onChangePage={(i) => setCurrentPage1(i)}
      /> */}
    </div>
  );
};

export default MyQandA;
