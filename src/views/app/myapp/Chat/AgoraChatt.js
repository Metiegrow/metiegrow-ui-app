/* eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Container, Card, Col, Row, CardBody } from 'reactstrap';
import AgoraRTM from 'agora-rtm-sdk';
import {useParams} from "react-router-dom";
import { Colxx } from 'components/common/CustomBootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
// import SaySomething from 'components/applications/SaySomething';
// import MessageCard from 'components/applications/MessageCard';




const APP_ID = 'a7a1371f655546a2a4b8febbef9c23fd';
const CHANNEL = 'chatapp';

let client = AgoraRTM.createInstance(APP_ID);

// let uid = Math.random().toString(36).substring(2);


const AgoraChat = () => {
    const {pid}=useParams();
    // console.log("chkkkk",pid)
    let uid = pid;

  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [channel, setChannel] = useState(null);
  const scrollBarRef = useRef(null);

  const focusScrollBottom = () => {
    setTimeout(() => {
      if (scrollBarRef.current) {
        scrollBarRef.current._ps.element.scrollTop =
          scrollBarRef.current._ps.contentHeight;
      }
    }, 100);
  };


  // const org_name = "611104323"
  // const app_name = "1329874"
//   const regurl = `a61.chat.agora.io/${org_name}/${app_name}/users`
//   const RegisteringUser  = () => {
//   axios.post(regurl)
// }
  const appendMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  useEffect(() => {
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(CHANNEL);
      await channel.join();
      channel.on('ChannelMessage', (message, peerId) => {
        appendMessage({
          text: message.text,
          uid: peerId,
        });
      });
      setChannel(channel);
      return channel;
    };
    const connection = connect();

    return () => {
      const disconnect = async () => {
        const channel = await connection;
        await channel.leave();
        await client.logout();
      };
      disconnect();
    };
  }, []);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    focusScrollBottom();

  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text === '') return;
    channel.sendMessage({ text, type: 'text' });
    appendMessage({
      text: text,
      uid,
    });
    setText('');
  };

  return (
    <Colxx className="mt-5 d-flex flex-column  position-relative">
    <h1>Chat</h1>
    <div className="flex-grow-1 d-flex flex-column">
      <div className="messages p-3 flex-grow-1 overflow-auto" ref={messagesRef}>
        <div className="inner">
        <PerfectScrollbar
              ref={scrollBarRef}
              // containerRef={(ref) => {}}
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
          {messages.map((message, idx) => (
            // <div key={idx} className="message">
            //   {message.uid === uid && (
            //     <div className="user-self">You:&nbsp;</div>
            //   )}
            //   {message.uid !== uid && (
            //     <div className="user-them">Them:&nbsp;</div>
            //   )}
            //   <Card className="text p-2">{message.text}</Card>
            // </div>
            <>
      <Card
        className={`d-inline-block mb-3 float-${
          message.uid !== uid ? 'left' : 'right'
        }`}
      >
        <div className="position-absolute  pt-1 pr-2 r-0">
          <span className="text-extra-small text-muted">time</span>
        </div>
        <CardBody>
          <div className="d-flex flex-row pb-1">
            <img
              alt="name"
              src=""
              className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
            />
            <div className=" d-flex flex-grow-1 min-width-zero">
              <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <p className="mb-0 truncate list-item-heading">
                    sender name
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-text-left">
            <p className="mb-0 text-semi-muted">{message.text}</p>
          </div>
        </CardBody>
      </Card>
      <div className="clearfix" />
    </>
          ))}
          </PerfectScrollbar>
        </div>
      </div>

      
      {/* <Row className="app-row">
        <Colxx xxs="12" className="chat-app">
          {loadingConversations && selectedUser && (
            <ChatHeading
              name={selectedUser.name}
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
              {messages.map((message, index) => {
                const sender = allContacts.find((x) => x.id === item.sender);
                return (
                  <MessageCard
                    key={index}
                    sender={sender}
                    item={message}
                    currentUserid={currentUser.id}
                  />
                );
              })}
            </PerfectScrollbar>
          )}
        </Colxx>
      </Row> */}
    </div>
    <div className="input-container fixed-bottom d-flex justify-content-center mb-3">
      {/* <form onSubmit={sendMessage} className="w-50">
        <Row className="align-items-center">
          <Col>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
            />
          </Col>
          <Col xs="auto">
            <Button color="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </form> */}
       <form onSubmit={sendMessage} >
       <div className="chat-input-container d-flex justify-content-between align-items-center">
      <Input
        className="form-control flex-grow-1"
        type="text"
        placeholder="Type your message here..."
        value={text}
        // onKeyPress={(e) => handleChatInputPress(e)}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <Button outline color="primary" className="icon-button large ml-1">
          <i className="simple-icon-paper-clip" />
        </Button>

        <Button
          color="primary"
          className="icon-button large ml-1"
          type='submit'
        >
          <i className="simple-icon-arrow-right" />
        </Button>
      </div>
    </div>
    </form>
    </div>
  </Colxx>
  );
}

export default AgoraChat;
