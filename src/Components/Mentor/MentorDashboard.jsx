import React from 'react';
import { Button, Card, Badge, Progress } from 'antd';
import { Users, DollarSign, Star, TrendingUp, Calendar, Plus, MessageSquare } from 'lucide-react';
import PostRequirement from '../Common/PostRequirement';
import CommonToolkit from '../Common/CommonToolkit';

const MentorDashboard = ({
  dashboardData,
  windowWidth,
  router,
  handleImageUpload,
  handleImageModalClose,
  isImageModalOpen,
  uploadedImageUrl,
}) => {
  const stats = {
    totalSessions: 45,
    totalEarnings: 1250,
    averageRating: 4.8,
    activeStudents: 12,
  };

  const recentSessions = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      status: 'completed',
      earnings: 25,
      rating: 5,
    },
    {
      id: 2,
      studentName: 'Mike Chena',
      date: '2024-01-14',
      time: '2:00 PM',
      duration: '1 hour',
      status: 'completed',
      earnings: 25,
      rating: 4,
    },
    {
      id: 3,
      studentName: 'Emily Davis',
      date: '2024-01-16',
      time: '11:00 AM',
      duration: '1 hour',
      status: 'upcoming',
      earnings: 25,
      rating: null,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'upcoming':
        return 'processing';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-4 md:p-6'>
      {/* Top Row: Title blocks (left) and sidebar header (right) */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <div className='lg:col-span-2'>
          <h2 className='text-xl mb-3'>Session Overview</h2>
          <Card className='bg-cardblack border border-borderfound rounded-2xl'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
                    <Users size={20} />
                  </div>
                  <div>
                    <p className='text-found text-sm'>Total Sessions</p>
                    <p className='text-2xl font-bold'>{stats.totalSessions}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className='text-found text-sm'>Earnings</p>
                    <p className='text-2xl font-bold'>${stats.totalEarnings}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
                    <Star size={20} className='text-textyellow' />
                  </div>
                  <div>
                    <p className='text-found text-sm'>Avg Rating</p>
                    <p className='text-2xl font-bold'>{stats.averageRating}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
                    <TrendingUp size={20} className='text-purple-primary' />
                  </div>
                  <div>
                    <p className='text-found text-sm'>Active Students</p>
                    <p className='text-2xl font-bold'>{stats.activeStudents}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder chart area */}
            <div className='h-60 md:h-64 w-full rounded-xl bg-secondary border border-borderfound flex items-center justify-center'>
              <p className='text-text-graytext'>Chart Placeholder</p>
            </div>

            {/* Performance mini bars */}
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <div className='flex justify-between text-sm mb-2'>
                  <span>Session Completion</span>
                  <span>84%</span>
                </div>
                <Progress percent={84} strokeColor='#A82EFF' showInfo={false} />
              </div>
              <div>
                <div className='flex justify-between text-sm mb-2'>
                  <span>Student Satisfaction</span>
                  <span>96%</span>
                </div>
                <Progress percent={96} strokeColor='#FAFE43' showInfo={false} />
              </div>
            </div>
          </Card>

          {/* Earnings Overview */}
          <h2 className='text-xl mt-8 mb-3'>Earnings Overview</h2>
          <Card className='bg-cardblack border border-borderfound rounded-2xl'>
            <div className='flex items-center justify-between mb-4'>
              <div className='text-found'>Last 30 days</div>
              <div className='text-found'>$1,250</div>
            </div>
            <div className='h-56 w-full rounded-xl bg-secondary border border-borderfound flex items-center justify-center'>
              <p className='text-text-graytext'>Earnings Graph Placeholder</p>
            </div>
          </Card>
        </div>

        {/* Right column: reuse components */}
        <div className='space-y-6'>
          <div className='bg-secondary border border-borderfound rounded-2xl p-4'>
            <CommonToolkit userType='mentor' router={router} />
          </div>

          <div className='bg-secondary border border-borderfound rounded-2xl p-4'>
            <PostRequirement cardSize='compact' showTitle={true} title='Post Your Requirement' />
          </div>

          <Card className='bg-secondary border border-borderfound rounded-2xl'>
            <div className='space-y-3 p-4'>
              <Button
                onClick={() => router.navigate({ to: '/app/availability' })}
                className='w-full bg-cardblack text-white border border-borderfound'
                icon={<Calendar size={16} />}
              >
                Set Availability
              </Button>
              <Button
                onClick={() => router.navigate({ to: '/app/gigs' })}
                className='w-full bg-cardblack text-white border border-borderfound'
                icon={<Plus size={16} />}
              >
                Create Service
              </Button>
              <Button
                onClick={() => router.navigate({ to: '/app/message' })}
                className='w-full bg-cardblack text-white border border-borderfound'
                icon={<MessageSquare size={16} />}
              >
                Messages
              </Button>
            </div>
          </Card>

          <Card className='bg-secondary border border-borderfound rounded-2xl'>
            <p className='text-found text-sm p-4'>
              Ask your questions to industry experts & grow up your knowledge
            </p>
          </Card>
        </div>
      </div>

      {/* Recent Sessions list */}
      <Card title='Recent Sessions' className='bg-cardblack border border-borderfound rounded-2xl'>
        <div className='space-y-4'>
          {recentSessions.map((s) => (
            <div key={s.id} className='flex items-center justify-between p-4 bg-black rounded-lg'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
                  <Users size={18} />
                </div>
                <div>
                  <p className='font-medium'>{s.studentName}</p>
                  <p className='text-found text-sm'>
                    {s.date} at {s.time} • {s.duration}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Badge status={getStatusColor(s.status)} text={s.status} />
                <div className='text-right'>
                  <p className='font-medium'>${s.earnings}</p>
                  {s.rating && (
                    <div className='flex items-center'>
                      <Star className='text-textyellow' size={14} />
                      <span className='text-sm ml-1'>{s.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MentorDashboard;
