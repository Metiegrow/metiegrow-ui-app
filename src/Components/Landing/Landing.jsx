import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, GraduationCap, Users, Globe, BookOpen, Building2, Star, MessageCircle, Briefcase, Home, UserCheck, Smartphone, Download, Menu, X } from 'lucide-react';
import { ArrowUpIcon, LogoIcon, DollarIcon,TrendingUpIcon,TargetIcon, DownloadDownIcon , DiamondIcon, HexagonIcon} from '../Common/SVG/svg.function';
import { Button, Divider } from 'antd';
import Herosectionrightimage from '../../assets/Herosectionrightimage.png';
import Brands from '../../assets/Brands.png';
import Aboutme from '../../assets/Aboutme.png';
import Frame1 from '../../assets/Frame1.png';
import Features1 from '../../assets/Features1.png';
import Features2 from '../../assets/Features2.png';
import Features3 from '../../assets/Features3.png';
import Features4 from '../../assets/Features4.png';
import Features5 from '../../assets/Features5.png';
import Features6 from '../../assets/Features6.png';
import Mobile from '../../assets/Mobile.png';
import Bgpurple from '../../assets/Bgpurple.png';
import Parrot from '../../assets/Parrot.png';
import TeamMember1 from '../../assets/TeamMember1.png';
import TeamMember2 from '../../assets/TeamMember2.png';
import TeamMember3 from '../../assets/TeamMember3.png';





const Landing = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Users className='w-8 h-8' />,
      title: 'Connect with Batchmates',
      description: 'Join University-specific groups before arrival',
      support: 'We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.',
      readMore: true,
      image: 'batchmates',
      side: 'left'
    },
    {
      icon: <GraduationCap className='w-8 h-8' />,
      title: 'Chat with Alumni',
      description: 'Core Value 02',
      support: 'Connect with experienced alumni who have successfully navigated their study abroad journey and can provide valuable insights and guidance.',
      readMore: true,
      image: 'alumni',
      side: 'right'
    },
    {
      icon: <UserCheck className='w-8 h-8' />,
      title: 'Verified Immigration Lawyers',
      description: 'Get legal advice and support from verified immigration lawyers.',
      support: 'Access professional legal assistance from certified immigration lawyers to ensure your visa process and documentation are handled correctly.',
      readMore: true,
      image: 'lawyers',
      side: 'left'
    },
    {
      icon: <Briefcase className='w-8 h-8' />,
      title: 'Career Help from Professionals',
      description: 'Access career guidance, resume reviews, and interview prep from industry experts.',
      support: 'Get personalized career coaching from industry professionals to help you build a successful career path in your chosen field.',
      readMore: true,
      image: 'professionals',
      side: 'right'
    },
    {
      icon: <Building2 className='w-8 h-8' />,
      title: 'Local Jobs & Internships',
      description: 'Find part-time jobs and internships to support your studies abroad.',
      support: 'Discover local employment opportunities and internships that align with your academic schedule and career goals.',
      readMore: true,
      image: 'jobs',
      side: 'left'
    },
    {
      icon: <Home className='w-8 h-8' />,
      title: 'Landing Landlords & Roommate Match',
      description: 'Find trusted landlords and compatible roommates for your accommodation needs.',
      support: 'Connect with verified landlords and find compatible roommates to create a comfortable living environment during your studies.',
      readMore: true,
      image: 'landlords',
      side: 'right'
    },
  ];

  const howItWorks = [
    {
      number: '1',
      title: 'Tell Us Your Dream',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. page when looking at its layout.',
      color: 'purple'
    },
    {
      number: '2',
      title: 'Get Matched With People & Resources',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      color: 'yellow'
    },
    {
      number: '3',
      title: 'Start Winning, Even Before You Fly',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      color: 'green'
    }
  ];

  const stepIcons = [DollarIcon,TrendingUpIcon,TargetIcon];

  const mentors = [
    {
      name: 'Adelin Miah',
      role: 'Student at University of Toronto',
      image: 'mentor1',
      badge: 'Most Helpful',
      badgeColor: 'bg-[#FFF5D2]',
      diamondColor: 'bg-orange-500'
    },
    {
      name: 'Courtney Christensen',
      role: 'Student at University of Toronto',
      image: 'mentor2',
      badge: 'Top Earned',
      badgeColor: 'bg-[#E2F0FF]',
      diamondColor: 'bg-blue-500'
    },
    {
      name: 'Ariana Opikou',
      role: 'Student at University of Toronto',
      image: 'mentor3',
      badge: 'Community Star',
      badgeColor: 'bg-[#E3F1E6]',
      diamondColor: 'bg-green-500'
    }
  ];

  const mentorImages = [TeamMember1, TeamMember2, TeamMember3];

  // Map feature images by index so each card uses its corresponding asset
  const featureImages = [Features1, Features2, Features3, Features4, Features5, Features6];

  const partnerLogos = ['Invert', 'Snowflake™', 'Proline', 'hHitech', 'Flash'];

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div 
              className='flex items-center cursor-pointer'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <LogoIcon />
              <h2 className='pl-2 text-purple-800 font-bold'>Metie</h2>
            </div>
            
            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-8'>
              <a href='#about' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>About</a>
              <a href='#pricing' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Pricing</a>
              <a href='#blog' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Blog</a>
              <a href='#contact' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Contact</a>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className='hidden md:flex items-center space-x-4'>
              <Button
                onClick={() => navigate({ to: '/login' })}
                className='px-4 py-2 text-sm font-medium text-darktext hover:text-purple-600 transition-colors border-0 bg-transparent'
              >
                Login
              </Button>
              <Button
                onClick={() => navigate({ to: '/signup' })}
                className='px-6 py-6 text-sm font-medium bg-[#050038] text-white rounded-full hover:bg-purple-700 transition-colors cursor-pointer'
              >
                Signup
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className='md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 transition-colors'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>
          
          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className='md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg'>
              <div className='px-4 py-4 space-y-4'>
                <a 
                  href='#about' 
                  className='block text-[#777E90] hover:text-[#3772FF] transition-colors no-underline py-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href='#pricing' 
                  className='block text-[#777E90] hover:text-[#3772FF] transition-colors no-underline py-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href='#blog' 
                  className='block text-[#777E90] hover:text-[#3772FF] transition-colors no-underline py-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <a 
                  href='#contact' 
                  className='block text-[#777E90] hover:text-[#3772FF] transition-colors no-underline py-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className='pt-4 border-t border-gray-200 space-y-3'>
                  <Button
                    onClick={() => {
                      navigate({ to: '/login' });
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full px-4 py-2 text-sm font-medium text-[#777E90] hover:text-[#3772FF] transition-colors border border-gray-300 bg-transparent'
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate({ to: '/signup' });
                      setIsMobileMenuOpen(false);
                    }}
                    className='w-full px-6 py-6 text-sm font-medium bg-[#050038] text-white rounded-full hover:bg-purple-700 transition-colors cursor-pointer'
                  >
                    Signup
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id='home' className='relative pt-16 pb-10 sm:pt-20 sm:pb-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='text-center md:text-left'>
              <p className='text-sm text-lightgray uppercase tracking-wider mb-4'>WELCOME TO METIE.</p>
              <h1 className='text-4xl sm:text-6xl font-bold tracking-tight text-[#23262F] leading-tight'>
                Your GPS for Study Abroad Journey
              </h1>
              <p className='mt-6 text-lg sm:text-xl text-[#000000] max-w-2xl'>
                From choosing the right university to finding a job abroad — Metie is with you at every step.
              </p>
                <div className='mt-10 flex justify-center md:justify-start'>
                  <Button
                    onClick={() => navigate({ to: '/signup' })}
                    className='rounded-full px-2 pr-4 py-8 text-xl font-semibold text-white shadow-sm bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 flex items-center group cursor-pointer'
                  >
                    <DownloadDownIcon className='w-5 h-5' />
                    Get started - It's free
                  </Button>
                </div>
            </div>
            <div className='relative'>
           <img
                          src={Herosectionrightimage}
                          className='object-cover w-full h-auto rounded-2xl'
                          alt='Industry Support'
                        />
              </div>
              
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className='py-8 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <img
            src={Brands}
            className='object-contain w-full h-auto block mx-auto'
            alt='Industry Support'
          />
        </div>
      </section>

      {/* Ecosystem Section */}
        <section className='py-24 bg-[#050038] text-center'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <h3 className='text-xs sm:text-sm text-[#777E90] uppercase tracking-widest font-semibold mb-3'>ABOUT METE</h3>
            <h1 className='text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight'>Ecosystem of students</h1>
            <p  className='text-[#D9D9D9]'>From choosing the right univerSity to finding a job abroad - Metie is with you at every step</p>
            <img
              src={Aboutme}
              className='object-contain block mx-auto w-full h-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl'
              alt='Industry Support'
            />
          </div>
      </section>

      {/* Features Section */}
      <section id='features' className='pt-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h3 className='text-xs sm:text-sm text-[#777E90] uppercase tracking-widest font-semibold mb-3'>OUR FEATURES</h3>
            <h1 className='text-4xl sm:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight'>Everything you need to succeed Abroad</h1>
          </div>
          {features.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 ${feature.side === 'right' ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${feature.side === 'right' ? 'lg:col-start-2' : ''} text-center md:text-left`}>
                <div>
                  <div className='inline-flex items-center gap-2 bg-[#EDEBFF] text-purple-900 rounded-full px-2 py-2 mb-6 shadow-sm'>
                    <span className='w-6 h-6 p-1 rounded-full bg-white flex items-center justify-center'>
                      <HexagonIcon />
                    </span>
                    <span className='text-xs text-[#050038] sm:text-sm font-xl tracking-wider'>DIVE INTO THE REALITY</span>
                  </div>
                  <h3 className='text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-[#050038] mb-4 mt-0'>
                    {feature.title}
                  </h3>
                  <p className='text-lg sm:text-xl lg:text-2xl text-gray-900/90 mt-0'>
                    {feature.description}
                  </p>
                  <div className='border-t border-gray-200 my-6 mt-8' />
                  {feature.support && (
                    <p className='text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl'>
                      {feature.support}
                    </p>
                  )}
                  {feature.readMore && (
                    <a href='#' className='inline-flex items-center gap-3 text-[#050038] font-semibold hover:text-purple-800 transition-colors group no-underline'>
                      Land More
                      <span className='w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-purple-800 transition-colors'>
                        <ArrowUpIcon className='w-3.5 h-3.5' />
                      </span>
                    </a>
                  )}
                </div>
              </div>
              <div className={feature.side === 'right' ? 'lg:col-start-1' : ''}>
                {featureImages[index] ? (
                  <img
                    src={featureImages[index]}
                    alt={feature.title}
                    className='block w-full h-auto object-contain rounded-2xl mx-auto lg:ml-auto lg:mr-0 shadow-xl'
                  />
                ) : (
                  <div className='relative w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center'>
                        {feature.icon}
                      </div>
                      <p className='text-gray-600'>{feature.title} Image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='py-24 bg-[#050038]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-sm text-white/80 uppercase tracking-wider mb-4'>OUR PROCESS</p>
          <h2 className='text-4xl sm:text-5xl font-bold text-white mb-16'>How it work</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-24 ml-4'>
            {howItWorks.map((step, index) => (
              <div key={index} className='relative'>
                {/* Colored offset shadow behind the card */}
                <div
                  className={`absolute inset-0 -translate-x-3 translate-y-3 rounded-[28px] ${
                    step.color === 'purple'
                      ? 'bg-[#7A3CF3]'
                      : step.color === 'yellow'
                      ? 'bg-[#D0F24A]'
                      : 'bg-[#F9A43A]'
                  }`}
                  aria-hidden='true'
                />

                {/* Main card */}
                <div className='relative bg-white rounded-[28px] p-4 sm:p-6 lg:p-10 shadow-lg sm:shadow-[0_10px_20px_rgba(5,0,56,0.06)] border border-[#ECECF2] text-center md:text-left'>
                  {/* Icon square */}
                  <div className='relative inline-flex items-center justify-center mb-6 sm:mb-8 lg:mb-28'>
                    <div
                      className={`absolute -translate-x-1 translate-y-1 w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] ${
                        step.color === 'purple'
                          ? 'bg-[#7A3CF3]'
                          : step.color === 'yellow'
                          ? 'bg-[#D0F24A]'
                          : 'bg-[#F9A43A]'
                      }`}
                      aria-hidden='true'
                    />
                    <div className='relative w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-white border border-[#DCDCE8] flex items-center justify-center'>
                      {(() => {
                        const Icon = stepIcons[index] || Star;
                        return <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-[#050038]' />;
                      })()}
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className='text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight leading-snug text-[#050038] mb-3 sm:mb-4'>
                    {`${step.number}. ${step.title}`}
                  </h3>
                  <p className='text-[#3E3E59] text-sm sm:text-base lg:text-lg leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id='mentors' className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl font-bold text-gray-900 mb-16'>Be the Mentor You Wished You Had.</h2>
          <h3 className='text-xl font-bold text-gray-900 mb-16'>Our Team</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
            {mentors.map((mentor, index) => (
              <div key={index} className='rounded-2xl p-6 shadow-lg border border-gray-200 text-center md:text-left'>
                <div className='w-full h-84 rounded-xl overflow-hidden mb-6'>
                  <img
                    src={mentorImages[index]}
                    alt={mentor.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex justify-center md:justify-start mb-4'>
                  <div className={`inline-flex items-center gap-2 px-4 py-4 rounded-full text-md font-medium ${mentor.badgeColor} text-black`}>
                    <div className={`w-4 h-4 ${mentor.diamondColor || 'bg-white bg-opacity-20'} border border-white border-opacity-30 flex items-center justify-center`} style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                      <DiamondIcon className={`w-3 h-3 text-black`} />
                    </div>
                    {mentor.badge}
                  </div>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>{mentor.name}</h3>
                <p className='text-gray-600'>{mentor.role}</p>
              </div>
            ))}
          </div>
          
          <Button className='bg-[#A259FF] text-white px-8 py-6 rounded-full font-semibold hover:bg-purple-700 transition-colors'>
            See all mentors
          </Button>
        </div>
      </section>

      {/* AI Buddy Section */}
      <section className='relative bg-cover bg-center min-h-[64px]' style={{ backgroundImage: `url(${Bgpurple})` }}>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/20'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full'>
            <div className='relative flex justify-center lg:justify-start order-1 lg:order-1'>
              <img
                src={Parrot}
                className='object-contain w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] block object-top'
                alt='Metie Buddy Parrot'
              />
            </div>
            <div className='text-center lg:text-left order-2 lg:order-2 pb-4'>
              <p className='text-xs sm:text-sm text-white/80 uppercase tracking-wider mb-3 sm:mb-4'>AI CHATBOT</p>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>Metie Buddy AI</h2>
              <div className='space-y-3 sm:space-y-4 mb-6 sm:mb-8'>
                <div className='flex justify-center lg:justify-start items-start gap-2 sm:gap-3'>
                  <div className='text-center lg:text-left'>
                    <p className='text-white text-sm sm:text-base m-0'>Never feel lost abroad</p>
                    <p className='text-white text-xs sm:text-sm m-0'>— Metie Buddy is always one message away.</p>
                  </div>
                </div>
                <div className='flex justify-center lg:justify-start items-start gap-2 sm:gap-3'>
                  <div className='text-center lg:text-left'>
                    <p className='text-white text-sm sm:text-base m-0'>Your 24/7 international student buddy</p>
                    <p className='text-white text-xs sm:text-sm m-0'>— answers, support, and guidance in seconds.</p>
                  </div>
                </div>
              </div>
              <Button className='bg-white text-black px-6 sm:px-8 py-4 sm:py-6 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base'>
                Try Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='text-center md:text-left'>
              <p className='text-sm text-[#FF723B] uppercase tracking-wider mb-4'>Coming Soon</p>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>Try the App</h2>
              <p className='text-xl text-gray-600 mb-8'>
                Download our mobile app for on-the-go access to all features, resources, and communities.
              </p>
                 <div className='mt-10 flex justify-center md:justify-start'>
                  <Button
                    onClick={() => navigate({ to: '/signup' })}
                    className='rounded-full px-2 py-8 text-base font-semibold text-white shadow-sm bg-purple-700 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 flex items-center group cursor-pointer'
                  >
                    <DownloadDownIcon className='w-5 h-5' />
                     Download the App
                  </Button>
                </div>
            </div>
            <div className='relative'>
              <div className='w-full h-96 lg:mb-1.5 rounded-2xl flex items-center justify-center'>
                {/* <div className='text-center'>
                  <Smartphone className='w-24 h-24 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-600'>Mobile App Mockup</p>
                </div> */}
                 <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <img
            src={Mobile}
            className='object-contain w-full h-auto block mx-auto'
            alt='Industry Support'
          />
        </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-[#F6F7F7] py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
            <div className='text-center md:text-left'>
              <div className='flex items-center justify-center md:justify-start mb-4'>
                <LogoIcon />
                <h3 className='pl-2 text-[#050038] text-xl font-bold'>Metie</h3>
              </div>
              <h2 className='text-[#23262F] font-medium'>Let's make a great <br /> design together!</h2>
            </div>
            
            <div className='grid grid-cols-2 gap-2 text-center md:text-left'>
              <div>
                <h4 className='text-[#050038] font-bold mb-4'>Stocks</h4>
                <ul className='pl-0 space-y-4 list-none'>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>About</a></li>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Projects</a></li>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>What We Do</a></li>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Press</a></li>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Jobs</a></li>
                </ul>
              </div>
              <div>
                <h4 className='text-[#050038] font-semibold mb-4'>Info</h4>
                <ul className='pl-0 space-y-4 list-none'>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Download</a></li>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Demos</a></li>
                  <li><a href='#' className='text-[#777E90] hover:text-[#3772FF] transition-colors no-underline'>Support</a></li>
               </ul>
              </div>
            </div>
            
            <div className='text-center md:text-left'>
              <h4 className='text-[#050038] font-bold mb-4'>Office</h4>
              <div className='space-y-4'>
                <div>
                  <p className='text-[#777E90]'>43252 Barer Mountains</p>
                  <p className='text-[#777E90]'>Zackerychester</p>
                  <p className='text-[#777E90]'>Bahamas</p>
                </div>
                <div>
                  <p className='text-[#777E90]'>732-528-4945</p>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className='border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
            <p className='text-[#777E90] text-sm'>Copyright © 2025 Metie. All rights reserved.</p>
            <p className='text-[#23262F] text-sm mt-4 md:mt-0'>We use Cookies for better service. <a href='#' className='text-[#3772FF] font-bold no-underline'>Accept</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;