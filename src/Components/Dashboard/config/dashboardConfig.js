// Dashboard configuration for different user roles
export const dashboardConfig = {
  student: {
    title: 'Student Dashboard',
    banner: {
      title: 'Your Smart Study Abroad Companion',
      subtitle: 'Find housing, jobs, mentors & everything you need - all in one place',
      image: 'BannerImage2.png',
    },
    toolkit: {
      title: 'Your Student Toolkit',
      tools: [
        {
          name: 'Know your batch mate',
          icon: 'BatchMate',
          route: '/app/batchmates',
          category: 'primary',
        },
        {
          name: 'House Hunt',
          icon: 'HouseHunt',
          route: '/app/househunt',
          category: 'primary',
        },
        {
          name: 'SOP/LOR Writing',
          icon: 'SOP',
          route: '/app/soplorwriting',
          category: 'primary',
        },
        {
          name: 'Visa Help',
          icon: 'VisaHelp',
          route: '/app/lawyer',
          category: 'primary',
        },
        {
          name: 'Resume/CV Writing',
          icon: 'Resume',
          route: '/app/resume',
          category: 'secondary',
        },
        {
          name: 'Interview Preparation',
          icon: 'InterviewPreparation',
          route: '/app/interviewpreparation',
          category: 'secondary',
        },
        {
          name: 'University Admission Guidance',
          icon: 'UniversityAdmissionGuidance',
          route: '/app/admission-guidance',
          category: 'secondary',
        },
      ],
    },
    sections: [
      {
        title: 'Recommended Mentors',
        route: '/app/mentor',
        type: 'mentors',
        showViewAll: true,
      },
      {
        title: 'Alumni Supports',
        route: '/app/alumni',
        type: 'alumni',
        showViewAll: true,
      },
      {
        title: 'Lawyer Supports',
        route: '/app/lawyer',
        type: 'lawyers',
        showViewAll: true,
      },
      {
        title: 'Questions & Answer',
        route: '/app/answers',
        type: 'questions',
        showViewAll: true,
        description: 'Ask your questions to industry experts & grow up your knowledge',
      },
    ],
    content: {
      upcomingSessions: true,
      industrySupport: true,
    },
  },

  mentor: {
    title: 'Mentor Dashboard',
    banner: {
      title: 'Your Mentor Dashboard',
      subtitle: 'Manage your sessions, earnings, and student connections',
      image: 'BannerImage2.png',
    },
    toolkit: {
      title: 'Your Mentor Toolkit',
      tools: [
        {
          name: 'My Sessions',
          icon: 'Calendar',
          route: '/app/mentor-sessions',
          category: 'primary',
        },
        {
          name: 'Earnings',
          icon: 'DollarSign',
          route: '/app/mentor-earnings',
          category: 'primary',
        },
        {
          name: 'My Students',
          icon: 'Users',
          route: '/app/mentor-students',
          category: 'primary',
        },
        {
          name: 'Resources',
          icon: 'BookOpen',
          route: '/app/mentor-resources',
          category: 'primary',
        },
        {
          name: 'Messages',
          icon: 'MessageSquare',
          route: '/app/mentor-messages',
          category: 'secondary',
        },
        {
          name: 'Analytics',
          icon: 'TrendingUp',
          route: '/app/mentor-analytics',
          category: 'secondary',
        },
        {
          name: 'Reviews',
          icon: 'Award',
          route: '/app/mentor-reviews',
          category: 'secondary',
        },
        {
          name: 'Settings',
          icon: 'Settings',
          route: '/app/mentor-settings',
          category: 'secondary',
        },
      ],
    },
    sections: [
      {
        title: 'My Sessions',
        route: '/app/mentor-sessions',
        type: 'sessions',
        showViewAll: true,
      },
      {
        title: 'My Earnings',
        route: '/app/mentor-earnings',
        type: 'earnings',
        showViewAll: true,
      },
      {
        title: 'Questions & Answer',
        route: '/app/answers',
        type: 'questions',
        showViewAll: true,
        description: 'Answer questions from students & build your reputation',
      },
    ],
    content: {
      sessionOverview: true,
      earningsOverview: true,
      quickStats: true,
    },
  },

  lawyer: {
    title: 'Lawyer Dashboard',
    banner: {
      title: 'Your Legal Services Dashboard',
      subtitle: 'Manage your cases, clients, and legal services',
      image: 'BannerImage2.png',
    },
    toolkit: {
      title: 'Your Lawyer Toolkit',
      tools: [
        {
          name: 'My Cases',
          icon: 'Briefcase',
          route: '/app/lawyer-cases',
          category: 'primary',
        },
        {
          name: 'Earnings',
          icon: 'DollarSign',
          route: '/app/lawyer-earnings',
          category: 'primary',
        },
        {
          name: 'My Clients',
          icon: 'Users',
          route: '/app/lawyer-clients',
          category: 'primary',
        },
        {
          name: 'Legal Resources',
          icon: 'BookOpen',
          route: '/app/lawyer-resources',
          category: 'primary',
        },
      ],
    },
    sections: [
      {
        title: 'My Cases',
        route: '/app/lawyer-cases',
        type: 'cases',
        showViewAll: true,
      },
      {
        title: 'My Earnings',
        route: '/app/lawyer-earnings',
        type: 'earnings',
        showViewAll: true,
      },
    ],
    content: {
      caseOverview: true,
      earningsOverview: true,
      clientStats: true,
    },
  },

  alumni: {
    title: 'Alumni Dashboard',
    banner: {
      title: 'Your Alumni Dashboard',
      subtitle: 'Connect with students and share your experience',
      image: 'BannerImage2.png',
    },
    toolkit: {
      title: 'Your Alumni Toolkit',
      tools: [
        {
          name: 'My Connections',
          icon: 'Users',
          route: '/app/alumni-connections',
          category: 'primary',
        },
        {
          name: 'Share Experience',
          icon: 'MessageSquare',
          route: '/app/alumni-experience',
          category: 'primary',
        },
        {
          name: 'Events',
          icon: 'Calendar',
          route: '/app/alumni-events',
          category: 'primary',
        },
        {
          name: 'Resources',
          icon: 'BookOpen',
          route: '/app/alumni-resources',
          category: 'primary',
        },
      ],
    },
    sections: [
      {
        title: 'My Connections',
        route: '/app/alumni-connections',
        type: 'connections',
        showViewAll: true,
      },
      {
        title: 'Questions & Answer',
        route: '/app/answers',
        type: 'questions',
        showViewAll: true,
        description: 'Share your knowledge and experience with students',
      },
    ],
    content: {
      connectionOverview: true,
      experienceSharing: true,
    },
  },
};

// Helper function to get dashboard config for a specific role
export const getDashboardConfig = (role) => {
  return dashboardConfig[role] || dashboardConfig.student;
};

// Helper function to check if a feature is enabled for a role
export const isFeatureEnabled = (role, feature) => {
  const config = getDashboardConfig(role);
  return config.content && config.content[feature];
};

export default dashboardConfig;
