/* eslint-disable*/
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, NavLink, Row, Spinner, TabContent, TabPane } from 'reactstrap';
import AC from 'agora-chat';


import { Colxx } from 'components/common/CustomBootstrap';
import {useParams} from "react-router-dom";

import {
  getContacts,
  getConversations,
  changeConversation,
  addMessageToConversation,
} from 'redux/actions';
// import ChatApplicationMenu from 'containers/applications/ChatApplicationMenu';
// import ChatHeading from 'components/applications/ChatHeading';
// import MessageCard from 'components/applications/MessageCard';
import SaySomething from 'components/applications/SaySomething';
import TimestampConverter from '../Calculation/TimestampConverter';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
import ApplicationMenu from 'components/common/ApplicationMenu';
import ChatHeading from './ChatHeading';
import ThumbnailLetters from './ThumbnailLetters';
// import ThumbnailLetters from 'components/cards/ThumbnailLetters';
// import MessageCard from './MessageCard';

const ChatApp = ({
  // intl,
  // allContacts,
  conversations,
  loadingConversations,
  loadingContacts,
  currentUser,
  selectedUser,
  selectedUserId,

  getContactsAction,
  getConversationsAction,
  changeConversationAction,
  addMessageToConversationAction,
}) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messageInput, setMessageInput] = useState('');
  const scrollBarRef = useRef(null);
  useEffect(() => {
    document.body.classList.add('no-footer');
    const currentUserId = 0;
    getContactsAction();
    getConversationsAction(currentUserId);

    return () => {
      document.body.classList.remove('no-footer');
    };
  }, [getContactsAction, getConversationsAction]);

  const focusScrollBottom = () => {
    setTimeout(() => {
      if (scrollBarRef.current) {
        scrollBarRef.current._ps.element.scrollTop =
          scrollBarRef.current._ps.contentHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (loadingConversations && loadingContacts && selectedUser == null) {
      changeConversationAction(selectedUserId);
      focusScrollBottom();
    }
  }, [
    changeConversationAction,
    loadingContacts,
    loadingConversations,
    selectedUser,
    selectedUserId,
  ]);


  // const handleChatInputPress = (e) => {
  //   if (e.key === 'Enter') {
  //     if (messageInput.length > 0) {
  //       addMessageToConversationAction(
  //         currentUser.id,
  //         selectedUser.id,
  //         messageInput,
  //         conversations
  //       );
  //       setMessageInput('');
  //       setActiveTab('messages');
  //       focusScrollBottom();
  //     }
  //   }
  // };

  // const handleSendButtonClick = () => {
  //   if (messageInput.length > 0) {
  //     addMessageToConversationAction(
  //       currentUser.id,
  //       selectedUser.id,
  //       messageInput,
  //       conversations
  //     );
  //     setMessageInput('');
  //     setActiveTab('messages');
  //     focusScrollBottom();
  //   }
  // };

  // const { messages } = intl;

  const selectedConversation =
    loadingConversations && loadingContacts && selectedUser
      ? conversations.find(
          (x) =>
            x.users.includes(currentUser.id) &&
            x.users.includes(selectedUser.id)
        )
      : null;

      // const role = localStorage.getItem("roleRes");
  const {pid}=useParams();

      const [connection, setConnection] = useState(null);
      const [userId, setUserId] = useState("");
      const [token, setToken] = useState("");
      const [peerId, setPeerId] = useState(pid);
      const tokenRes = localStorage.getItem("tokenRes")
      const [appKey, setAppKey] = useState("")
      // console.log("peer", peerId)
      useEffect(() => {
        const fetchData = async () => {
          try {
            
            const response = await axios.get(`${baseUrl}/api/chat/usertoken`, {
            // const response = await axios.get(`${baseUrl}/api/chat/lawyer/${pid}/usertoken`, {
              headers: {
                'Authorization': `Bearer ${tokenRes}`, 
              }
            });
            setToken(response.data.token);
            setUserId(response.data.chatUserName)
            setAppKey(response.data.appKey)
            // setPeerId(response.data.targetChatUserName)
            // console.log("run",response)
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, []); 

      
 
      
      
  const [peerMessage, setPeerMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const [serverConversations, setServerConversations] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loadingConversation, setLoadingConversation] = useState(true)
  const [chatLoading, setChatLoading] =useState(true)
  // const [historyMessages, setHistoryMessages] = useState([]); 



  // console.log("log",logs)

  // const appKey = '611104323#1329874';

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const conn = new AC.connection({
        appKey: appKey,
      });
  
      conn.addEventHandler('connection&message', {
        onConnected: () => {
          // addLog('Connect success!');
          // fetchHistoryMessages(); 
          conn.getServerConversations({ pageSize: 50, cursor: '' })
            .then((res) => {
              // console.log("conversation", res.data.conversations);
              setServerConversations(res.data.conversations);
              setLoadingConversation(false);
              // addLog("");
            })
            .catch((error) => {
              console.log('Error fetching server conversations:', error);
            });
          //   if (peerId !== undefined) {
  
          // conn.addContact(peerId, "hi")
          //   .then((res) => {
          //     console.log("addcontact", res);
          //     console.log("addcontactName", peerId);
          //   });
          // }
  
          if (peerId !== undefined) {
            conn.getHistoryMessages({
              targetId: peerId, // The user ID of the peer user for one-to-one chat or group ID for group chat.
              chatType: 'singleChat', // The chat type: `singleChat` for one-to-one chat or `groupChat` for group chat.
              pageSize: 20, // The number of messages to retrieve per page. The value range is [1,50] and the default value is 20.
              searchDirection: 'down', // The message search direction: `up` means to retrieve messages in the descending order of the message timestamp and `down` means to retrieve messages in the ascending order of the message timestamp.
              searchOptions: {
                msgTypes: ['txt'], // An array of message types for query. If no value is passed in, all types of message will be queried.
                startTime: new Date('2024, 05, 17').getTime(), // The start timestamp for query. The unit is millisecond.
                endTime: Date.now(), // The end timestamp for query. The unit is millisecond.
              },
            }).then((res) => {
              const newLogs = res.messages.map((message) => (
                <>
                  <strong><h4>{message.from === userId ? "You" : message.from}</h4></strong> <span className='text-muted'>{message.msg}</span> {" "}
                  <span className='text-muted text-right'><TimestampConverter timeStamp={message.time} format="datetime" /></span>
                </>
              ));
  
              setLogs((prevLogs) => [...prevLogs, ...newLogs]);
              setChatLoading(false);
            })
            .catch((error) => {
              console.log('Error fetching historical messages:', error);
            });
          }
        },
      
        onDisconnected: () => {
          // addLog('Logout!');
          // addLog('Logout success!');
          console.error("chat logout")
        },
        onTextMessage: (message) => {
          // console.log("msg", message);
          const time = message.time;
          
          if (message.from === peerId) {
            addLog(
              <>
                <strong><h4>{message.from}</h4></strong>  <span className='text-muted'>{message.msg}</span>  
                <span className='text-muted text-right'><TimestampConverter timeStamp={time} format="datetime" /></span>
              </>
            );
          }
        },
        onTokenWillExpire: () => {
          // addLog('Token is about to expire');
          console.error('Token is about to expire')
        },
        onTokenExpired: () => {
          console.error('The token has expired')
          // addLog('The token has expired');
        },
        onError: (error) => {
          console.log('on error', error);
        },
      });
  
      setConnection(conn);
      conn.open({
        user: userId,
        agoraToken: token,
      });
      setLoading(false);
    }, 3000);
  
    return () => clearTimeout(timeoutId);
  }, [peerId, userId, token, appKey]);
  

//   connection.getServerConversations({pageSize:50, cursor: ''}).then((res)=>{
//     console.log("res",res)
// })

  // const fetchHistoryMessages = () => {
  //   if (!connection) return;

  //   const options = {
  //     targetId: peerId,
  //     chatType: "singleChat",
  //     pageSize: 20,
  //     searchDirection: 'down',
  //     searchOptions: {
  //       from: userId,
  //       msgTypes: ['txt'],
  //       startTime: new Date('2024-05-17').getTime(),
  //       endTime: new Date('2024-05-18').getTime(),
  //     },                                                                // check the name and add log
  //   };

  //   connection.getHistoryMessages(options).then((messages) => {
  //     console.log("Fetched historical messages", messages);
  //     setHistoryMessages(messages);
  //     messages.forEach(message => {
  //       addLog(`Historical message from: ${message.from} Message: ${message.msg}`);
  //     });
  //   }).catch((error) => {
  //     console.log('Error fetching historical messages', error);
  //   });
  // };

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  // const handleLogout = () => {
  //   connection.close();
  //   addLog('Logout');
  // };

  const handleSendMessage = () => {
    const option = {
      chatType: 'singleChat',
      type: 'txt',
      to: peerId,
      msg: peerMessage,
    };
    const msg = AC.message.create(option);
    connection
      .send(msg)
      .then(() => {
        // console.log("sms", msg);
      
        const time = msg.time;
      
        addLog(
          <>
            <strong><h4>{"You"}</h4></strong> <br /> <span className='text-muted'>{peerMessage}</span>  
           <span className='text-muted text-right'> <TimestampConverter timeStamp={time} format="datetime" /></span>
          </>
        );
      
        setPeerMessage('');
      focusScrollBottom();

      })
      
      .catch(() => {
        console.log('send private text fail');
      });
  };

  const handleConversationClick = (selectedUserId) => {
    setChatLoading(true)
    setPeerId(selectedUserId);
    setLogs([]);
    
  };

  const handleChatInputPress = (e) => {
    if (e.key === 'Enter') {
      if (peerMessage.length > 0) {
        handleSendMessage();
        setPeerMessage('');
        setActiveTab('messages');
        focusScrollBottom();
      }
    }
  };

  useEffect(() => {
    focusScrollBottom();
  }, [peerId, addLog]);
 

  // return loadingConversations && loadingContacts ? (
  return  (
  <>
  {loading ? (
    <div className='loading' />
    // <div className="d-flex justify-content-center align-items-center vh-70">
    //   <Spinner color="primary" className="" />
    // </div>
  ) : (
      <Row className="app-row">
        <Colxx xxs="12" className="chat-app">
          {peerId && loadingConversations && selectedUser && (
            <ChatHeading
              name={peerId}
              thumb={peerId}
              // lastSeenDate={selectedUser.lastSeenDate}
            />
          )}

        {!peerId && (
          <>
          <div className="d-flex justify-content-center align-items-center vh-70">
          <i className="simple-icon-bubbles display-1" />
        </div>
          <h2 className='d-flex justify-content-center align-items-center'>Chat</h2>
          </>
        )}

          {peerId && selectedConversation && (
            <PerfectScrollbar
              ref={scrollBarRef}
              // containerRef={(ref) => {}}
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {/* {selectedConversation.messages.map((item, index) => { */}
              {/* {logs.map((log, index) => {
                const sender = allContacts.find((x) => x.id === item.sender);
                return (
                  <MessageCard
                    key={index}
                    sender={sender}
                    item={log}
                    currentUserid={currentUser.id}
                  />
                );
              })} */}
              {chatLoading ? ( 
                // <div className='loading' />
                <div className="d-flex justify-content-center mt-4">
              <Spinner color="primary" className="mb-1" />
            </div>
              ) : (
              <div>
        {logs.map((log, index) => (
          <Card className=' mb-3  p-3' key={index}>{log}</Card>
      //     <Card
      //     index={index}
      //   // className="d-inline-block mb-3 float-right"
      //   // className={`d-inline-block mb-3 float-${
      //   //   item.sender !== currentUserid ? 'left' : 'right'
      //   // }`}
      // >
      //   <CardBody>
      //     {/* <div className="d-flex flex-row pb-1"> */}
      //       {/* <img
      //         alt={sender.name}
      //         src={sender.thumb}
      //         className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
      //       /> */}
      //       {/* <div className=" d-flex flex-grow-1 min-width-zero">
      //         <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
      //           <div className="min-width-zero">
      //             <p className="mb-0 truncate list-item-heading">
      //               {log}
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div> */}

      //     <div className="chat-text-left">
      //       <p className="mb-0 text-semi-muted">{log}</p>
      //     </div>
      //   </CardBody>
      // </Card>
        ))}
      </div>
      )}
            </PerfectScrollbar>
          )}
        </Colxx>
      </Row>
      )}
      {/* <Button className='mb-3' onClick={handleLogin}>Connect</Button> */}
      <div className="d-flex justify-content-center">
  {/* <Button className='mb-3' onClick={handleLogin}>Connect</Button> */}
</div>
      { peerId && (<SaySomething
        // placeholder={messages['chat.saysomething']}
        placeholder="Say something..."
        messageInput={peerMessage}
        handleChatInputPress={handleChatInputPress}
        handleChatInputChange={(e) => {
          setPeerMessage(e.target.value);
        }}
        handleSendButtonClick={handleSendMessage}
      />)}
      {/* <ChatApplicationMenu activeTab={activeTab} toggleAppMenu={setActiveTab} /> */}
      <ApplicationMenu>
      <TabContent activeTab={activeTab} className="chat-app-tab-content">

      <TabPane tabId="messages" className="chat-app-tab-pane">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <div className="pt-2 pr-4 pl-4 pb-2">
            <h3 className="font-weight-bold mt-2">Contacts</h3>
            {loadingConversation ? (
              <div className="d-flex justify-content-center mt-4">
              <Spinner color="primary" className="mb-1" />
            </div>
                  ) :(
            <>
            {serverConversations.length === 0 && (
              <p>There is no contacts</p>
            )}

            {serverConversations.map((conversation) => (
          //     <>
          // <li key={conversation.conversationId}>
          //   {conversation.conversationId}
          // </li>
        
                      // <NavLink
                      // key={conversation.conversationId}
                      //   className="d-flex"
                      //   to="#"
                      //   location={{}}
                      //   onClick={(e) =>
                      //     handleConversationClick(conversation.conversationId)
                      //   }
                      // >
                      <NavLink
                          className="d-flex"
                          key={conversation.conversationId}
                          to="#"
                          location={{}}
                          onClick={() => handleConversationClick(conversation.conversationId)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* <img
                            alt={item.name}
                            src={item.thumb}
                            className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                          /> */}
                          <ThumbnailLetters
                          extraSmall 
                  rounded
                  text={conversation.conversationId}
                  className="m-1"
                />
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                              <div className="min-width-zero">
                                <p className="mb-0 truncate">{conversation.conversationId}</p>
                              </div>
                               <div className="separator mb-2" />
                            </div>
                          </div>

                        </NavLink>
                      
                        // <div className="d-flex flex-grow-1 min-width-zero"  key={conversation.conversationId}>
                        //   <Col lg={12} className="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                        //     <Card className="min-width-zero p-2 mb-2">
                        //       <p className=" mb-0 truncate" onClick={() =>
                        //   handleConversationClick(conversation.conversationId)
                        // }>{conversation.conversationId}</p>
                        //       {/* <p className="mb-1 text-muted text-small">
                        //         {item.lastMessageTime}
                        //       </p> */}
                        //     </Card>
                        //   </Col>
                        // </div>
                      // </NavLink>
                      // </>
                ))}
                </>
              )}
            </div>
          </PerfectScrollbar>
        </TabPane>
        </TabContent>
    </ApplicationMenu>


    </>
  ) 
};

const mapStateToProps = ({ chatApp }) => {
  const {
    allContacts,
    conversations,
    loadingConversations,
    loadingContacts,
    currentUser,
    selectedUser,
    selectedUserId,
  } = chatApp;

  return {
    allContacts,
    conversations,
    loadingConversations,
    loadingContacts,
    currentUser,
    selectedUser,
    selectedUserId,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getContactsAction: getContacts,
    getConversationsAction: getConversations,
    changeConversationAction: changeConversation,
    addMessageToConversationAction: addMessageToConversation,
  })(ChatApp)
);