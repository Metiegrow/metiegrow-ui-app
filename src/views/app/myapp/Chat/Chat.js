/* eslint-disable*/
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Card, CardBody, Row } from 'reactstrap';
import AC from 'agora-chat';


import { Colxx } from 'components/common/CustomBootstrap';

import {
  getContacts,
  getConversations,
  changeConversation,
  addMessageToConversation,
} from 'redux/actions';
import ChatApplicationMenu from 'containers/applications/ChatApplicationMenu';
import ChatHeading from 'components/applications/ChatHeading';
// import MessageCard from 'components/applications/MessageCard';
import SaySomething from 'components/applications/SaySomething';
import TimestampConverter from '../Calculation/TimestampConverter';
import axios from 'axios';
import { baseUrl } from 'constants/defaultValues';
// import MessageCard from './MessageCard';

const ChatApp = ({
  // intl,
  allContacts,
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

  useEffect(() => {
    focusScrollBottom();
  }, [selectedUserId]);

  const handleChatInputPress = (e) => {
    if (e.key === 'Enter') {
      if (messageInput.length > 0) {
        addMessageToConversationAction(
          currentUser.id,
          selectedUser.id,
          messageInput,
          conversations
        );
        setMessageInput('');
        setActiveTab('messages');
        focusScrollBottom();
      }
    }
  };

  const handleSendButtonClick = () => {
    if (messageInput.length > 0) {
      addMessageToConversationAction(
        currentUser.id,
        selectedUser.id,
        messageInput,
        conversations
      );
      setMessageInput('');
      setActiveTab('messages');
      focusScrollBottom();
    }
  };

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
      const [connection, setConnection] = useState(null);
      const [userId, setUserId] = useState("");
      const [token, setToken] = useState("");
      const [peerId] = useState('sivanesh');
      const tokenRes = localStorage.getItem("tokenRes")
      useEffect(() => {
        const fetchData = async () => {
          try {
            
            const response = await axios.get(`${baseUrl}/api/chat/usertoken`, {
              headers: {
                'Authorization': `Bearer ${tokenRes}`, 
              }
            });
            setToken(response.data.token);
            setUserId(response.data.chatUserName)
            console.log("run",response)
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, []); 
      


      // useEffect(() => {
      //   if (role === 'LAWYER') {
      //     setUserId('mahalingam');
      //     setToken("007eJxTYFjVabzz+9yU93W/uJ5tqH/feSO8mL85wOeg39OKwtmuJ5cpMBiZm5kbpiUbpVomJZokGhlamBsYp6almpqlmJsYGBibfLnjkdYQyMjw4TO7KSMDKwMjEIL4KgwmyWYpponmBrqGpoZJuoaGqWm6iSaGlroGKQamScaGBqkpaSkAt/Yqpg==");
      //     setPeerId("mahalingam")
      //   } else if (role === 'MENTEE') {
      //     setUserId('mahalingam');
      //     setToken("007eJxTYBCseiW56Wu5uJKzxPaidJf7lceidJ+fmJh1vvfu3rf5t8oUGIzMzcwN05KNUi2TEk0SjQwtzA2MU9NSTc1SzE0MDIxN3O96pDUEMjLMFvtsxMjAysAIhCC+CoNJslmKaaK5ga6hqWGSrqFhappuoomhpa5BioFpkrGhQWpKWgoA3xcopQ==");
      //     setPeerId("sivanesh")
      //   }
      // }, []);
      

  //     const [connection, setConnection] = useState(null);
  // const [userId] = useState('kumar123');
  // const [token] = useState('007eJxTYLh2JvOrbUmVuM/28LbDaSImEfufXNladiOKoXzKjVzjhB0KDEbmZuaGaclGqZZJiSaJRoYW5gbGqWmppmYp5iYGBsYmQnEeaQ2BjAyG58+yMDKwMjACIYivwmBsCdRiaGmga5BqYKlraJiapptonGqia5JilmpgYJGSkppqAQCJ5Cdb');
  // const [peerId] = useState('arun123');
  const [peerMessage, setPeerMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]); 

  // const startTime = new Date('2024,05,17').getTime(); // The start timestamp for query. The unit is millisecond.
  //   const endTime = Date.now();
  //   console.log("timefrom",startTime)
  //   console.log("timeto",endTime)


  console.log("log",logs)

  const appKey = '611104323#1329874';

  useEffect(() => {
    const conn = new AC.connection({
      appKey: appKey,
    });
    




    conn.addEventHandler('connection&message', {
      onConnected: () => {
        addLog('Connect success!');
        fetchHistoryMessages(); 
        conn.getServerConversations({ pageSize: 50, cursor: '' })
        .then((res) => {
          console.log("conversation", res.data.conversations);
        // addLog("");
          
        })
        .catch((error) => {
          console.log('Error fetching server conversations:', error);
        });
        conn.getHistoryMessages({
          targetId: "sivanesh", // The user ID of the peer user for one-to-one chat or group ID for group chat.
          chatType: 'singleChat', // The chat type: `singleChat` for one-to-one chat or `groupChat` for group chat.
          pageSize: 20, // The number of messages to retrieve per page. The value range is [1,50] and the default value is 20.
          searchDirection: 'down', // The message search direction: `up` means to retrieve messages in the descending order of the message timestamp and `down` means to retrieve messages in the ascending order of the message timestamp.
          searchOptions: {
            from: "mahalingam", // The user ID of the message sender. This parameter is used only for group chat.
            msgTypes: ['txt'], // An array of message types for query. If no value is passed in, all types of message will be queried.
            startTime: new Date('2024,05,17').getTime(), // The start timestamp for query. The unit is millisecond.
            // endTime: new Date('2024,05,18').getTime(), // The end timestamp for query. The unit is millisecond.
            endTime: Date.now(),
          },
        }).then((res) => {
        console.log("Historical messages", res);
        addLog("Historical messages fetched successfully");
      })
      .catch((error) => {
        console.log('Error fetching historical messages:', error);
        addLog('Error fetching historical messages');
      });
      },
      onDisconnected: () => {
        addLog('Logout success!');
      },
      onTextMessage: (message) => {
        console.log("msg",message)
        const time = message.time
        
        // addLog( `${message.from} : ${message.msg} - <TimestampConverter timeStamp={time} format="datetime" />`);
        addLog(
          <>
            {message.from} : {message.msg} - 
            <TimestampConverter timeStamp={time} format="datetime" />
          </>
        );
      },
      onTokenWillExpire: () => {
        addLog('Token is about to expire');
      },
      onTokenExpired: () => {
        addLog('The token has expired');
      },
      onError: (error) => {
        console.log('on error', error);
      },
     
      
    });

    setConnection(conn);
  }, []);

//   connection.getServerConversations({pageSize:50, cursor: ''}).then((res)=>{
//     console.log("res",res)
// })

  const fetchHistoryMessages = () => {
    if (!connection) return;

    const options = {
      targetId: peerId,
      chatType: "singleChat",
      pageSize: 20,
      searchDirection: 'down',
      searchOptions: {
        from: userId,
        msgTypes: ['txt'],
        startTime: new Date('2024-05-17').getTime(),
        endTime: new Date('2024-05-18').getTime(),
      },
    };

    connection.getHistoryMessages(options).then((messages) => {
      console.log("Fetched historical messages", messages);
      setHistoryMessages(messages);
      messages.forEach(message => {
        addLog(`Historical message from: ${message.from} Message: ${message.msg}`);
      });
    }).catch((error) => {
      console.log('Error fetching historical messages', error);
    });
  };

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const handleLogin = () => {
    // addLog('Logging in...');
    connection.open({
      user: userId,
      agoraToken: token,
    });
  };

  // useEffect(() => {
  //   handleLogin();
  // }, []);
  // useEffect(()=>{
  //   // addLog('Logging in...');
  //   connection.open({
  //     user: userId,
  //     agoraToken: token,
  //   });
  // },[]);

  const handleLogout = () => {
    connection.close();
    addLog('Logout');
  };

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
        console.log("sms", msg);
      
        // Ensure msg.time exists and is properly accessed
        const time = msg.time;
      
        // Ensure addLog is a valid function that can accept JSX
        addLog(
          <>
            {"You"}: {peerMessage} - 
            <TimestampConverter timeStamp={time} format="datetime" />
          </>
        );
      
        // Clear the peerMessage state after logging
        setPeerMessage('');
      })
      // .then(() => {
      //   console.log("sms",msg)
      //   time = msg.time
      //   addLog(
          
      //       <>
      //         {"You"} : {peerMessage} - 
      //         <TimestampConverter timeStamp={time} format="datetime" />
      //       </>
         
      //     // `You: ${peerMessage}`
      //   );
      //   setPeerMessage('')
      // })
      .catch(() => {
        console.log('send private text fail');
      });
  };

  // return loadingConversations && loadingContacts ? (
  return  (
  <>
      <Row className="app-row">
        <Colxx xxs="12" className="chat-app">
          {loadingConversations && selectedUser && (
            <ChatHeading
              name={peerId}
              thumb={selectedUser.thumb}
              lastSeenDate={selectedUser.lastSeenDate}
            />
          )}

          {selectedConversation && (
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
              <div>
        {logs.map((log, index) => (
          <Card className=' mb-3  p-2' key={index}>{log}</Card>
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
            </PerfectScrollbar>
          )}
        </Colxx>
      </Row>
      <Button onClick={handleLogin}>login</Button>
      <SaySomething
        // placeholder={messages['chat.saysomething']}
        placeholder="Say something..."
        messageInput={peerMessage}
        handleChatInputPress={handleChatInputPress}
        handleChatInputChange={(e) => {
          setPeerMessage(e.target.value);
        }}
        handleSendButtonClick={handleSendMessage}
      />
      <ChatApplicationMenu activeTab={activeTab} toggleAppMenu={setActiveTab} />
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
