import { Button, Card } from 'antd';
import { Edit, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const AddEditDeleteOption = ({ setShowStudyPreferenceModal }) => {
  return (
    <div>
      <Card className='absolute right-0 top-8 bg-cardblack border border-gray-600 rounded-lg shadow-lg z-10 min-w-24'>
        <Button
          variant='outline'
          onClick={() => setShowStudyPreferenceModal(true)}
          className='border-none flex items-center gap-2 w-full px-3 py-2 bg-transparent text-white hover:bg-gray-600 text-sm'
        >
          <Plus size={16} />
          Add
        </Button>
        <Button
          variant='outline'
          className='mt-2 flex items-center gap-2 w-full px-3 py-2 bg-transparent border-none text-white hover:bg-gray-600 text-sm'
        >
          <Edit size={16} />
          Edit
        </Button>
        <Button
          variant='outline'
          className='mt-2 flex items-center gap-2 w-full px-3 py-2 bg-transparent border-none text-white hover:bg-gray-600 text-sm '
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </Card>
    </div>
  );
};

export default AddEditDeleteOption;
