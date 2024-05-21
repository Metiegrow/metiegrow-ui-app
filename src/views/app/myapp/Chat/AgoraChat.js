/* eslint-disable */
import React, { useEffect, useState } from 'react';
import AC from 'agora-chat';

const AgoraChat = () => {
  const [connection, setConnection] = useState(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [peerId, setPeerId] = useState('');
  const [peerMessage, setPeerMessage] = useState('');
  const [logs, setLogs] = useState([]);

  console.log("messagelog",logs)

  const appKey = '611104323#1329874';

  useEffect(() => {
    const conn = new AC.connection({
      appKey: appKey,
    });

    conn.addEventHandler('connection&message', {
      onConnected: () => {
        addLog('Connect success!');
      },
      onDisconnected: () => {
        addLog('Logout success!');
      },
      onTextMessage: (message) => {
        addLog(`Message from: ${message.from} Message: ${message.msg}`);
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

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const handleLogin = () => {
    addLog('Logging in...');
    connection.open({
      user: userId,
      agoraToken: token,
    });
  };

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
        addLog(`Message sent to: ${peerId} Message: ${peerMessage}`);
        setPeerMessage("")
      })
      .catch(() => {
        console.log('send private text fail');
      });
  };

  return (
    <div>
      <h2>Agora Chat Examples</h2>
      <div>
        <label>User ID</label>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Token</label>
        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <label>Peer User ID</label>
        <input
          type="text"
          placeholder="Peer User ID"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />
      </div>
      <div>
        <label>Peer Message</label>
        <input
          type="text"
          placeholder="Peer Message"
          value={peerMessage}
          onChange={(e) => setPeerMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <hr />
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default AgoraChat;