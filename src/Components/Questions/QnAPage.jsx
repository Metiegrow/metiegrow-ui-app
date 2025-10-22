import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { QnAService, QUESTION_TYPES } from '../../Services/QnAService';
import QuestionsList from './QuestionsList';
import AskQuestionModal from './AskQuestionModal';

const { Search } = Input;
const { Option } = Select;

export default function QnAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showAskModal, setShowAskModal] = useState(false);

  // Fetch questions with filtering
  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['questions', searchTerm, selectedType],
    queryFn: () => QnAService.getQuestions(),
    select: (data) => {
      let filtered = data || [];

      if (searchTerm) {
        filtered = filtered.filter(
          (q) =>
            q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedType) {
        filtered = filtered.filter((q) => q.questionType === selectedType);
      }

      return filtered;
    },
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleTypeFilter = (value) => {
    setSelectedType(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
  };

  return (
    <div className='min-h-screen bg-black text-white p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Questions & Answers</h1>
          <p className='text-gray-400'>Ask questions to industry experts and grow your knowledge</p>
        </div>

        {/* Search and Filter Bar */}
        <div className='bg-[#121212] rounded-2xl p-6 mb-8'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <Search
                placeholder='Search questions...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                size='large'
                className='w-full'
                prefix={<SearchOutlined className='text-gray-400' />}
              />
            </div>
            <div className='md:w-64'>
              <Select
                placeholder='Filter by type'
                value={selectedType}
                onChange={handleTypeFilter}
                size='large'
                className='w-full'
                allowClear
              >
                {QUESTION_TYPES.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </div>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setShowAskModal(true)}
              size='large'
              className='bg-purple-600 hover:bg-purple-700 border-purple-600'
            >
              Ask Question
            </Button>
          </div>

          {(searchTerm || selectedType) && (
            <div className='mt-4 flex items-center gap-2'>
              <span className='text-sm text-gray-400'>
                {questions?.length || 0} questions found
              </span>
              <Button type='link' onClick={clearFilters} className='text-purple-400 p-0'>
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className='bg-[#121212] rounded-2xl p-6'>
          <QuestionsList questions={questions} loading={isLoading} error={error} />
        </div>

        {/* Ask Question Modal */}
        <AskQuestionModal isOpen={showAskModal} onClose={() => setShowAskModal(false)} />
      </div>
    </div>
  );
}
