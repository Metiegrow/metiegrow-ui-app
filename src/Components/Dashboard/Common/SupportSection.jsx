import React from 'react';
import Card from './Cards/Card';
import SupportCard from './Cards/SupportCard';

const SupportSection = ({ userType, supports = [] }) => {
  // Sample data - in real app this would come from props or API
  const sampleSupports = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      rating: '4.9',
      price: '50',
      specialties: ['React', 'Node.js', 'AWS'],
      avatar: null,
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Data Scientist',
      company: 'Microsoft',
      rating: '4.8',
      price: '45',
      specialties: ['Python', 'Machine Learning', 'TensorFlow'],
      avatar: null,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      company: 'Meta',
      rating: '4.7',
      price: '55',
      specialties: ['Product Strategy', 'Agile', 'User Research'],
      avatar: null,
    },
  ];

  const displaySupports = supports.length > 0 ? supports : sampleSupports;

  const handleBookSupport = (supportId) => {
    console.log(`Booking support ${supportId}`);
    // Implement book support logic
  };

  const getSupportTitle = () => {
    switch (userType) {
      case 'student':
        return 'Mentors & Alumni';
      case 'mentor':
        return 'Available Mentors';
      case 'alumni':
        return 'Peer Support';
      case 'lawyer':
        return 'Legal Support';
      default:
        return 'Support Network';
    }
  };

  return (
    <Card className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl font-bold'>{getSupportTitle()}</h2>
        <button className='text-[#50FFB9] text-sm font-medium hover:text-[#40E0A0] transition-colors'>
          View All
        </button>
      </div>

      {/* Support Cards */}
      <div className='space-y-4'>
        {displaySupports.map((support) => (
          <SupportCard
            key={support.id}
            support={support}
            onBookClick={() => handleBookSupport(support.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default SupportSection;
