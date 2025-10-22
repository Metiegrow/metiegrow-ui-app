import React from 'react';
import ShareButton from './ShareButton';

/**
 * Example component showing how to use the ShareButton
 * This demonstrates different use cases and configurations
 */
const ShareExample = () => {
  // Example data for different content types
  const exampleData = {
    post: {
      id: '123',
      title: 'Amazing opportunity for students!',
      content: 'Check out this incredible internship opportunity for computer science students...',
      author: 'John Doe',
    },
    profile: {
      userId: '456',
      name: 'Sarah Johnson',
      bio: 'Software Engineer passionate about mentoring students',
    },
    question: {
      id: '789',
      title: 'How to prepare for coding interviews?',
      content: 'I have a coding interview coming up and I need some tips...',
    },
    room: {
      id: '101',
      location: 'Melbourne, Australia',
      roomType: 'Shared Room',
      description: 'Beautiful shared room in the heart of Melbourne with all amenities included.',
    },
  };

  return (
    <div className='p-6 bg-gray-900 min-h-screen text-white'>
      <h1 className='text-2xl font-bold mb-8'>Share Button Examples</h1>

      <div className='space-y-8'>
        {/* Basic Share Button */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Basic Share Button</h2>
          <p className='text-gray-300 mb-4'>Simple share button with default settings</p>
          <ShareButton />
        </div>

        {/* Post Share */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Share a Post</h2>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-medium'>{exampleData.post.title}</h3>
              <p className='text-gray-400 text-sm'>By {exampleData.post.author}</p>
            </div>
            <ShareButton type='post' data={exampleData.post} size='md' showText={true} />
          </div>
        </div>

        {/* Profile Share */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Share a Profile</h2>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-medium'>{exampleData.profile.name}</h3>
              <p className='text-gray-400 text-sm'>{exampleData.profile.bio}</p>
            </div>
            <ShareButton type='profile' data={exampleData.profile} size='lg' />
          </div>
        </div>

        {/* Question Share */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Share a Question</h2>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <h3 className='font-medium'>{exampleData.question.title}</h3>
              <p className='text-gray-400 text-sm line-clamp-2'>{exampleData.question.content}</p>
            </div>
            <ShareButton type='question' data={exampleData.question} size='sm' className='ml-4' />
          </div>
        </div>

        {/* Room Share */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Share a Room Listing</h2>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <h3 className='font-medium'>
                {exampleData.room.roomType} in {exampleData.room.location}
              </h3>
              <p className='text-gray-400 text-sm line-clamp-2'>{exampleData.room.description}</p>
            </div>
            <ShareButton
              type='room'
              data={exampleData.room}
              size='md'
              showText={true}
              className='ml-4'
            />
          </div>
        </div>

        {/* Custom Platforms */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Limited Platforms</h2>
          <p className='text-gray-300 mb-4'>Share button with only WhatsApp and Facebook</p>
          <ShareButton
            type='general'
            data={{ url: window.location.href, title: 'Check out our platform!' }}
            platforms={['whatsapp', 'facebook']}
            showText={true}
          />
        </div>

        {/* With Callback */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>With Share Callback</h2>
          <p className='text-gray-300 mb-4'>This button logs share events to console</p>
          <ShareButton
            type='general'
            data={{ url: window.location.href, title: 'Amazing platform!' }}
            onShare={(platform, result) => {
              console.log('Share event:', { platform, result });
              // You can track analytics here
            }}
            showText={true}
          />
        </div>
      </div>

      {/* Usage Instructions */}
      <div className='mt-12 bg-gray-800 p-6 rounded-lg'>
        <h2 className='text-xl font-semibold mb-4'>How to Use ShareButton</h2>
        <div className='space-y-4 text-gray-300'>
          <div>
            <h3 className='font-medium text-white mb-2'>Basic Usage:</h3>
            <pre className='bg-gray-700 p-3 rounded text-sm overflow-x-auto'>
              {`<ShareButton />`}
            </pre>
          </div>

          <div>
            <h3 className='font-medium text-white mb-2'>With Content Type:</h3>
            <pre className='bg-gray-700 p-3 rounded text-sm overflow-x-auto'>
              {`<ShareButton
  type="post"
  data={{ id: '123', title: 'My Post', content: '...' }}
  size="md"
  showText={true}
/>`}
            </pre>
          </div>

          <div>
            <h3 className='font-medium text-white mb-2'>With Callback:</h3>
            <pre className='bg-gray-700 p-3 rounded text-sm overflow-x-auto'>
              {`<ShareButton
  onShare={(platform, result) => {
    console.log('Shared to:', platform);
  }}
/>`}
            </pre>
          </div>

          <div>
            <h3 className='font-medium text-white mb-2'>Supported Content Types:</h3>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <code className='bg-gray-600 px-1 rounded'>post</code> - Blog posts, articles
              </li>
              <li>
                <code className='bg-gray-600 px-1 rounded'>profile</code> - User profiles
              </li>
              <li>
                <code className='bg-gray-600 px-1 rounded'>question</code> - Q&A questions
              </li>
              <li>
                <code className='bg-gray-600 px-1 rounded'>room</code> - Room listings
              </li>
              <li>
                <code className='bg-gray-600 px-1 rounded'>general</code> - Any custom content
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareExample;
