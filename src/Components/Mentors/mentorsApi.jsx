// Mock API for mentor ratings and reviews
export async function fetchMentorRatingsAndReviews(mentorId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    ratingData: {
      average: 4.3,
      total: 256,
      reviewCount: 158,
      distribution: [
        { stars: 5, percentage: 20 },
        { stars: 4, percentage: 75 },
        { stars: 3, percentage: 3 },
        { stars: 2, percentage: 2 },
        { stars: 1, percentage: 0 },
      ],
    },
    reviews: [
      {
        id: 1,
        name: 'David Willaiam',
        timeAgo: '3d ago',
        institution: 'Student TAC university',
        verified: true,
        content:
          'Loved the structured approach of the webinar! The content was well-paced, covering both AI fundamentals and real-world applications. The Q&A session was especially helpful!',
        likes: 123,
        comments: 20,
      },
      {
        id: 2,
        name: 'Jane Doe',
        timeAgo: '1w ago',
        institution: 'ABC College',
        verified: false,
        content: 'Great mentor, very insightful and helpful with my career questions.',
        likes: 45,
        comments: 5,
      },
      {
        id: 3,
        name: 'Sam Smith',
        timeAgo: '2w ago',
        institution: 'XYZ University',
        verified: true,
        content: 'The session was interactive and cleared all my doubts. Highly recommend!',
        likes: 67,
        comments: 12,
      },
    ],
  };
}
