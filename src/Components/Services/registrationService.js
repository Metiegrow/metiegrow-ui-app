import { apiClient, getApiBaseUrl } from './apiClient';

export const registrationService = {
  async registerStudent(baseUrl, payload) {
    // Try with CORS headers and different endpoint variations
    const headers = {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    // Try the original endpoint first
    let result = await apiClient.postJson(`${baseUrl}/api/register/student`, payload, headers);

    // If 401, try alternative endpoints
    if (!result.ok && result.status === 401) {
      console.log('Trying alternative student registration endpoints...');

      // Try without /api prefix
      result = await apiClient.postJson(`${baseUrl}/register/student`, payload, headers);

      if (!result.ok && result.status === 401) {
        // Try with v1 prefix
        result = await apiClient.postJson(`${baseUrl}/api/v1/register/student`, payload, headers);
      }
    }

    return result;
  },

  async registerMentor(baseUrl, requestJson, documentFile) {
    return apiClient.postMultipartJson(
      `${baseUrl}/api/v1/mentor/register`,
      'request',
      requestJson,
      { document: documentFile }
    );
  },

  async registerLawyer(baseUrl, requestJson, documentFile) {
    return apiClient.postMultipartJson(`${baseUrl}/api/register/lawyer`, 'request', requestJson, {
      document: documentFile,
    });
  },

  async registerAlumni(baseUrl, requestJson, documentFile) {
    return apiClient.postMultipartJson(`${baseUrl}/api/register/alumni`, 'request', requestJson, {
      document: documentFile,
    });
  },

  async registerLandlord(baseUrl, requestJson, documentFile) {
    return apiClient.postMultipartJson(`${baseUrl}/api/landlord/register`, 'request', requestJson, {
      document: documentFile,
    });
  },

  async registerRecruiter(baseUrl, requestJson, documentFile) {
    return apiClient.postMultipartJson(
      `${baseUrl}/api/register/recruiter`,
      'request',
      requestJson,
      { document: documentFile }
    );
  },
};

export function deriveUsername(fullName, email) {
  if (email && email.includes('@')) return email.split('@')[0];
  if (fullName) return fullName.toLowerCase().replace(/\s+/g, '');
  return `user${Date.now()}`;
}
