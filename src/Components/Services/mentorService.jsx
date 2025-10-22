const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

export const mentorService = {
  async registerMentor(mentorData, document) {
    try {
      // Ensure skills is a non-empty array
      const skillsArray = Array.isArray(mentorData.skills)
        ? mentorData.skills.filter(Boolean)
        : mentorData.skills
          ? [mentorData.skills]
          : [];
      const safeSkills = skillsArray.length > 0 ? skillsArray : ['general'];

      // Prepare the request payload with ONLY required fields
      const requestPayload = {
        password: mentorData.password,
        confirmPassword: mentorData.confirmPassword,
        email: mentorData.email,
        fullName: mentorData.fullName,
        phoneNumber: mentorData.mobileNumber || mentorData.phoneNumber,
        currentJobTitle: mentorData.currentJobTitle,
        companyName: mentorData.companyName,
        industry: mentorData.industry,
        experience: mentorData.experience,
        skills: safeSkills,
        nationality: mentorData.nationality,
        fieldOfStudy: mentorData.fieldOfStudy,
        collegeName: mentorData.collegeName,
        passedOutYear: String(mentorData.passedOutYear ?? ''),
        linkedinProfile: mentorData.linkedinProfile || '',
        degreeDocument: document?.name || mentorData.degreeDocument || '',
      };

      const formData = new FormData();
      // Send request as application/json part to satisfy strict parsers
      formData.append(
        'request',
        new Blob([JSON.stringify(requestPayload)], { type: 'application/json' })
      );
      if (document) formData.append('document', document, document.name);

      const response = await fetch(`${URL}/api/v1/mentor/register`, {
        method: 'POST',
        body: formData,
      });

      // Try to parse JSON error or fallback to text
      const contentType = response.headers.get('content-type') || '';
      const parsed = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message =
          typeof parsed === 'string' ? parsed : parsed?.message || parsed?.statuses?.[0]?.message;
        throw new Error(message || `HTTP error! status: ${response.status}`);
      }

      return { success: true, data: parsed };
    } catch (error) {
      console.error('Mentor registration error:', error);
      return {
        success: false,
        error: error.message || 'Mentor registration failed. Please try again.',
      };
    }
  },

  async getMentorCards(page = 0, size = 10) {
    try {
      // Import getAuthHeaders function
      const { getAuthHeaders } = await import('../Auth/Auth.Function');

      const response = await fetch(`${URL}/api/v1/mentor/cards?page=${page}&size=${size}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Get mentor cards error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch mentor cards. Please try again.',
      };
    }
  },

  async getMentorProfile(mentorId) {
    try {
      // Import getAuthHeaders function
      const { getAuthHeaders } = await import('../Auth/Auth.Function');

      const response = await fetch(`${URL}/api/v1/mentor/profile/${mentorId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Get mentor profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch mentor profile. Please try again.',
      };
    }
  },

  async updateMentorProfile(mentorId, profileData) {
    try {
      // Import getAuthHeaders function
      const { getAuthHeaders } = await import('../Auth/Auth.Function');

      const response = await fetch(`${URL}/api/v1/mentor/profile/${mentorId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Update mentor profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update mentor profile. Please try again.',
      };
    }
  },
};
