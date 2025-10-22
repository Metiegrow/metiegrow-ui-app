import { LikeIcon, ShareIcon } from '../Common/SVG/svg.function';
import { CommentIcon } from '../Dashboard/Dashboard.svg';
import { Button, Divider } from 'antd';
import ShareButton from '../Common/ShareButton';

const PostCard = ({
  name,
  field,
  timeAgo,
  question,
  likes,
  answers,
  onCommentClick,
  onLikeClick,
  isLiked = false,
  // postId,
}) => {
  return (
    <div className='bg-cardblack rounded-[24px] p-4 text-white'>
      {/* Header */}
      <div className='flex items-center mb-3'>
        <div className='w-10 h-10 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center mr-3'>
          <span className='text-white font-semibold'>{name?.[0]}</span>
        </div>

        <div className='flex-1'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold text-white text-sm'>{name}</h3>
            <span className='text-gray-400 text-xs'>{timeAgo}</span>
          </div>
          <p className='text-gray-400 text-xs mt-0'>{field}</p>
        </div>
      </div>

      {/* Question */}
      <div className='mb-4'>
        <p className='text-white font-medium leading-relaxed text-sm'>Q. {question}</p>
      </div>
      <Divider className='border-gray-700 my-2' />
      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button
            type='button'
            className='flex items-center space-x-0 text-gray-400 hover:text-purple-400'
            onClick={(e) => {
              e.stopPropagation?.();
              onLikeClick?.();
              console.log('PostCard like clicked');
            }}
            aria-label='Like question'
          >
            <LikeIcon isLiked={isLiked} className='w-4 h-4' />
            <span className='text-xs'>{likes}</span>
          </Button>
          <div
            className='flex items-center space-x-2 text-gray-400 cursor-pointer hover:text-purple-400'
            onClick={onCommentClick}
          >
            <CommentIcon className='w-4 h-4' />
            <span className='text-xs'>{answers}</span>
          </div>
        </div>
        <div className='text-gray-400'>
          <ShareIcon className='w-4 h-4' />
          {/* 
             <ShareButton
          type="question"
          data={{
            id: postId,
            title: question,
            content: question,
            author: name
          }}
          size="sm"
          className="text-gray-400"
        />
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
