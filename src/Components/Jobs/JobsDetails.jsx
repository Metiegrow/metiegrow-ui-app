import { useState, useEffect } from 'react';
import { MapPin, Users, Building } from 'lucide-react';
import { useParams, Link } from '@tanstack/react-router';
import { Button, Skeleton, Spin, message } from 'antd';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import PurpleButton from '../Common/Button/PurpleButton';
import { useNavigate } from '@tanstack/react-router';
import { getAuthHeaders } from '../Auth/Auth.Function';

export default function JobPosting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams({ strict: false });
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

  // Dummy data fallback
  const dummyJob = {
    id: id || '1',
    jobTitle: 'Product Designer',
    company: 'MC Info Tech',
    jobLocation: 'Sydney AUS',
    minExperienceYears: 2,
    maxExperienceYears: 5,
    minCTC: 50,
    maxCTC: 80,
    interestedCount: 136,
    skills: ['Product Management', 'Strategist', 'Analyst'],
    jobDescription:
      'We are seeking a highly motivated and detail-oriented Product Designer to join our dynamic team. You will play a key role in designing intuitive and engaging user experiences for our digital products and services.',
    responsibilities: [
      'Design user interfaces and experiences for our products',
      'Collaborate with cross-functional teams',
      'Conduct user research and testing',
    ],
    requirements: [
      '3+ years of product design experience',
      'Proficiency in design tools like Figma',
      'Strong portfolio showcasing UX/UI work',
    ],
    companyDescription:
      'MC Info Tech is a leading technology company specializing in innovative digital solutions. With offices across multiple regions including Dubai and Sydney, we deliver cutting-edge technology services to clients worldwide.',
    companyBenefits: [
      'Competitive salary and benefits',
      'Flexible work arrangements',
      'Opportunities for professional growth',
    ],
    postedOn: new Date().toISOString(),
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/posts/job-post/${id}`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const data = await response.json();
        setJob(data.job || data); // Handle different response structures
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.message);
        message.error('Failed to load job details - using demo data');
        setJob(dummyJob); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    } else {
      // If no ID, use dummy data
      setJob(dummyJob);
      setLoading(false);
    }
  }, [id, URL]);

  const formatExperience = (min, max) => {
    if (min === undefined || max === undefined) return 'Not specified';
    return `${min}-${max} yrs`;
  };

  const formatSalary = (min, max) => {
    if (min === undefined || max === undefined) return 'Not specified';
    if (min && max) return `${min}K-${max}K AUSD`;
    if (min) return `From ${min}K AUSD`;
    if (max) return `Up to ${max}K AUSD`;
    return 'Not specified';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Unknown date';
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center w-full min-h-screen text-white bg-black'>
        <Skeleton size='large' />
      </div>
    );
  }

  if (!job) {
    return (
      <div className='flex justify-center items-center w-full min-h-screen text-white bg-black'>
        <div>Job not found</div>
      </div>
    );
  }

  // Safely access nested properties with fallbacks
  const companyName = job.company || dummyJob.company;
  const companyInitial = companyName.charAt(0).toUpperCase();
  const jobTitle = job.jobTitle || dummyJob.jobTitle;
  const jobLocation = job.jobLocation || dummyJob.jobLocation;
  const appliedCount = job.interestedCount || job.appliedCount || dummyJob.interestedCount;
  const skills = job.skills || dummyJob.skills;
  const jobDescription = job.jobDescription || dummyJob.jobDescription;
  const companyDescription = job.companyDescription || dummyJob.companyDescription;
  const responsibilities = job.responsibilities || dummyJob.responsibilities;
  const requirements = job.requirements || dummyJob.requirements;
  const companyBenefits = job.companyBenefits || dummyJob.companyBenefits;

  return (
    <div className='w-full min-h-screen text-white bg-black'>
      <div className='mx-auto max-w-full'>
        {/* Header with back button */}
        <div className='px-4 pt-6 sm:px-6 md:px-8 lg:px-12'>
          <Link to='/app/jobs-listing' className='flex items-center text-gray-400 hover:text-white'>
            <BackButtonIcon />
          </Link>
        </div>

        {/* Company Logo and Info */}
        <div className='flex items-center px-4 mt-8 sm:px-6 md:px-8 lg:px-12'>
          <div className='relative'>
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={companyName}
                className='object-cover w-16 h-16 rounded-full'
              />
            ) : (
              <div className='flex justify-center items-center w-16 h-16 text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'>
                {companyInitial}
              </div>
            )}
          </div>
          <div className='ml-4'>
            <h1 className='text-2xl font-bold'>{jobTitle}</h1>
            <div className='flex items-center'>
              <p className='mt-0 font-medium text-green-400'>{companyName}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 px-4 mt-4 sm:px-6 md:px-8 lg:px-12'>
          {skills.map((skill, index) => (
            <span key={index} className='px-4 py-2 text-sm text-white rounded-full bg-cardblack'>
              {skill}
            </span>
          ))}
        </div>

        {/* Job Stats */}
        <div className='px-4 mt-6 text-gray-400 sm:px-6 md:px-8 lg:px-12'>
          <p>
            Exp {formatExperience(job.minExperienceYears, job.maxExperienceYears)} |{' '}
            {formatSalary(job.minCTC, job.maxCTC)}
          </p>
          <div className='flex flex-wrap gap-y-2 items-center mt-2'>
            <div className='flex items-center mr-6'>
              <MapPin size={18} className='mr-1' />
              <span>{jobLocation}</span>
            </div>
            <div className='flex items-center mr-6'>
              <Users size={18} className='mr-1' />
              <span>Applied: {appliedCount}</span>
            </div>
            <div className='flex items-center mr-6'>
              <Building size={18} className='mr-1' />
              <span>{companyName}</span>
            </div>
            <div className='mt-2 md:ml-auto md:mt-0'>
              <span>Posted on: {formatDate(job.postedOn)}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='mt-6 border-b border-gray-800'>
          <div className='flex px-4 sm:px-6 md:px-8 lg:px-12'>
            <a
              className={`py-3 px-4 relative ${activeTab === 'details' ? 'text-white' : 'text-gray-500'
                }`}
              onClick={() => setActiveTab('details')}
            >
              Job Details
              {activeTab === 'details' && (
                <div className='absolute bottom-0 left-0 w-full h-1 bg-purple-600'></div>
              )}
            </a>
            <a
              className={`py-3 px-1 ml-6 relative ${activeTab === 'company' ? 'text-white' : 'text-gray-500'
                }`}
              onClick={() => setActiveTab('company')}
            >
              About Company
              {activeTab === 'company' && (
                <div className='absolute bottom-0 left-0 w-full h-1 bg-purple-600'></div>
              )}
            </a>
          </div>
        </div>

        {/* Content */}
        <div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12'>
          {activeTab === 'details' ? (
            <div className='bg-cardblack p-4 sm:p-6 rounded-[24px]'>
              <h3 className='mb-4 text-xl font-bold'>Job Description</h3>
              <p className='mb-4 whitespace-pre-line'>{jobDescription}</p>
              {Array.isArray(responsibilities) && responsibilities.length > 0 && (
                <>
                  <h4 className='mb-2 font-bold'>Responsibilities:</h4>
                  <ul className='pl-5 mb-4 list-disc'>
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {Array.isArray(requirements) && requirements.length > 0 && (
                <>
                  <h4 className='mb-2 font-bold'>Requirements:</h4>
                  <ul className='pl-5 list-disc'>
                    {requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div className='bg-cardblack sm:p-6 rounded-[24px]'>
              <h3 className='mb-4 text-xl font-bold'>About {companyName}</h3>
              <p className='mb-4 whitespace-pre-line'>{companyDescription}</p>
              {Array.isArray(companyBenefits) && companyBenefits.length > 0 && (
                <>
                  <h4 className='mb-2 font-bold'>Why Join Us:</h4>
                  <ul className='pl-5 list-disc'>
                    {companyBenefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div className='flex justify-center px-4 pb-8 mb-8 sm:px-6 md:px-8 lg:px-12 md:justify-end'>
          <PurpleButton onClick={() => navigate({ to: '/app/jobs-form' })} text='Apply Job' />
        </div>
      </div>
    </div>
  );
}
