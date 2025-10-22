import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  MoreHorizontal,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  ArrowLeft,
} from 'lucide-react';
import { Input } from 'antd';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Link } from '@tanstack/react-router';

const API_URL = 'http://localhost:9001';

// Avatar utility function
function Avatar({ src, name, size = 48 }) {
  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-gray-700`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={name} className='w-full h-full object-cover' />
      ) : (
        <span className='text-white font-bold' style={{ fontSize: size / 2 }}>
          {name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </span>
      )}
    </div>
  );
}

const MessagingUI = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState('contacts'); // 'contacts' or 'chat'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
  const messagesEndRef = useRef(null);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
      if (window.innerWidth >= 750) setMobileView('both');
      else if (mobileView === 'both') setMobileView('contacts');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileView]);

  // Fetch contacts and messages
  const fetchContacts = async () => {
    const res = await axios.get(`${API_URL}/contacts`);
    setContacts(res.data);
  };
  const fetchMessages = async () => {
    const res = await axios.get(`${API_URL}/messages`);
    setMessages(res.data);
  };

  // Polling for real-time updates
  useEffect(() => {
    fetchContacts();
    fetchMessages();
    setLoading(false);
    const interval = setInterval(() => {
      fetchContacts();
      fetchMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedContact === null) return;
    const now = new Date();
    const msg = {
      contactId: selectedContact,
      sender: 'You',
      content: newMessage,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      read: false,
    };
    // POST to API
    const res = await axios.post(`${API_URL}/messages`, msg);
    setMessages((prev) => [...prev, res.data]);
    setNewMessage('');
    // Simulate read after 2s
    setTimeout(async () => {
      await axios.patch(`${API_URL}/messages/${res.data.id}`, { read: true });
      setMessages((prev) => prev.map((m) => (m.id === res.data.id ? { ...m, read: true } : m)));
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = (id) => {
    setSelectedContact(id);
    if (isMobile) setMobileView('chat');
  };

  const handleBack = () => {
    setMobileView('contacts');
  };

  const currentContact = contacts.find((c) => c.id === selectedContact);
  const currentMessages = messages.filter((m) => m.contactId === selectedContact);

  return (
    <div
      className={`h-[calc(100vh-120px)] bg-secondary text-white flex ${isMobile ? 'flex-col' : ''} md:rounded-[24px]`}
    >
      {/* Sidebar */}
      {(!isMobile || mobileView === 'contacts') && (
        <div
          className={`w-full md:w-70 bg-secondary border-r border-gray-700 flex flex-col ${isMobile ? '' : 'max-w-[350px]'} ${isMobile ? '' : 'min-w-[300px]'} md:rounded-[24px]`}
          style={
            isMobile
              ? {
                  minHeight: 0,
                  height: mobileView === 'contacts' ? '100%' : '0',
                  display: mobileView === 'contacts' ? 'flex' : 'none',
                }
              : {}
          }
        >
          {/* Header */}
          <div className='p-2 border-b border-gray-700'>
            <h1 className='text-xl font-semibold mb-2'>Messages</h1>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ' />
              <Input
                type='text'
                placeholder='Search..'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors'
              />
            </div>
          </div>
          {/* Contacts List */}
          <div className='flex-1 overflow-y-auto'>
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact.id)}
                className={`flex items-center p-2 hover:bg-gray-700 cursor-pointer transition-colors ${
                  selectedContact === contact.id && (!isMobile || mobileView === 'contacts')
                    ? 'bg-secondary border-r-2 border-purple-500'
                    : ''
                }`}
              >
                <div className='relative'>
                  <Avatar src={contact.avatarUrl} name={contact.name} size={isMobile ? 36 : 40} />
                  {contact.online && (
                    <div className='absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2 border-gray-800'></div>
                  )}
                </div>
                <div className='ml-3 flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-0'>
                    <h3 className='font-medium text-sm truncate mb-0'>{contact.name}</h3>
                    <span className='text-xs text-gray-400'>{contact.time}</span>
                  </div>
                  <p className='text-sm text-gray-400 truncate mt-0'>{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Divider for desktop only */}
      {!isMobile && <div style={{ width: '8px', background: 'black' }} />}
      {/* Main Chat Area */}
      {(!isMobile || mobileView === 'chat') && (
        <div
          className={`flex-1 flex flex-col md:rounded-[24px]`}
          style={
            isMobile
              ? {
                  minHeight: 0,
                  height: mobileView === 'chat' ? '100%' : '0',
                  display: mobileView === 'chat' ? 'flex' : 'none',
                }
              : {}
          }
        >
          {currentContact ? (
            <>
              {/* Chat Header */}
              <div className='p-4 border-b border-gray-700 flex items-center justify-between bg-secondary '>
                <div className='flex items-center'>
                  {isMobile && (
                    <Link
                      onClick={handleBack}
                      className='mr-2 p-2 rounded-full hover:bg-gray-700 transition-colors'
                    >
                      <BackButtonIcon className='w-6 h-6' />
                    </Link>
                  )}
                  <div className='relative'>
                    <Avatar
                      src={currentContact?.avatarUrl}
                      name={currentContact?.name}
                      size={isMobile ? 32 : 40}
                    />
                    {currentContact.online && (
                      <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-gray-800'></div>
                    )}
                  </div>
                  <div className='ml-3'>
                    <h2 className='font-medium text-base'>{currentContact.name}</h2>
                    <p className='text-xs text-gray-400'>
                      {currentContact.online ? '🟢 Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <button className='p-2 hover:bg-gray-700 rounded-full transition-colors'>
                  <MoreHorizontal className='w-5 h-5' />
                </button>
              </div>
              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-2 sm:p-4 space-y-4'>
                {currentMessages.map((message) =>
                  message.sender !== 'You' ? (
                    <div
                      key={message.id}
                      className='flex items-end gap-3 w-full justify-start rounded-2xl'
                    >
                      <Avatar
                        src={currentContact?.avatarUrl}
                        name={currentContact?.name}
                        size={isMobile ? 32 : 40}
                      />
                      <div className='max-w-[80vw] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-2xl bg-gray-700 text-white'>
                        <span className='text-xs text-gray-300 mb-1 block'>{message.sender}</span>
                        <p className='text-sm break-words whitespace-pre-line'>{message.content}</p>
                        <div className='flex items-center justify-between mt-2'>
                          <span className='text-xs opacity-70'>{message.time}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className='flex items-end gap-3 w-full justify-end'>
                      <div className='max-w-[80vw] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-2xl bg-purple-600 text-white'>
                        <p className='text-sm break-words whitespace-pre-line'>{message.content}</p>
                        <div className='flex items-center justify-between mt-2'>
                          <span className='text-xs opacity-70'>{message.time}</span>
                          <div className='ml-2'>
                            {message.read ? (
                              <CheckCheck className='w-4 h-4 text-blue-400' />
                            ) : (
                              <Check className='w-4 h-4 text-gray-400' />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* Message Input */}
              <div className='p-2 sm:p-4 border-t border-gray-700 bg-gray-800'>
                <div className='flex items-center space-x-8'>
                  <button className='p-2 hover:bg-gray-700 rounded-full transition-colors'>
                    <Paperclip className='w-5 h-5 text-gray-400' />
                  </button>
                  <div className='flex-1 relative'>
                    <input
                      type='text'
                      placeholder='Type Something...'
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className='w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-full text-sm focus:outline-none focus:border-purple-500 transition-colors pr-12'
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className='p-2 sm:p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-colors'
                  >
                    <Send className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className='flex-1 flex items-center justify-center text-gray-400'>
              <div className='text-center'>
                <div className='w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Search className='w-8 h-8' />
                </div>
                <h3 className='text-xl font-medium mb-2'>Select a conversation</h3>
                <p>Choose from your existing conversations or start a new one</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagingUI;
