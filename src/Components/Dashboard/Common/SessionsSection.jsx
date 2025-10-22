import React from 'react';
import Card from './Cards/Card';
import SessionCard from './Cards/SessionCard';

const SessionsSection = ({ userType, sessions = [] }) => {
  // Sample data - in real app this would come from props or API
  const sampleSessions = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of ML algorithms',
      time: '10:00 AM',
      date: 'Today',
      isToday: true,
      hasNotification: true,
    },
    {
      id: 2,
      title: 'Deep Learning Workshop',
      description: 'Advanced neural networks and applications',
      time: '2:00 PM',
      date: 'Tomorrow',
      isTomorrow: true,
      hasNotification: false,
    },
    {
      id: 3,
      title: 'Data Science Project Review',
      description: 'Review and discuss your data science projects',
      time: '4:00 PM',
      date: 'Dec 15',
      isToday: false,
      isTomorrow: false,
      hasNotification: false,
    },
  ];

  const displaySessions = sessions.length > 0 ? sessions : sampleSessions;

  const handleJoinSession = (sessionId) => {
    console.log(`Joining session ${sessionId}`);
    // Implement join session logic
  };

  return (
    <Card className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl font-bold'>Upcoming Sessions</h2>
        <button className='text-[#50FFB9] text-sm font-medium hover:text-[#40E0A0] transition-colors'>
          View All
        </button>
      </div>

      {/* Sessions List */}
      <div className='space-y-4'>
        {displaySessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onJoinClick={() => handleJoinSession(session.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default SessionsSection;
