import axiosInstance from './config/axios.config';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Normalize countries response into [{ name, phoneCode, flagUrl }]
 */
const normalizeCountries = (raw) => {
  try {
    let list = raw;
    if (!list) return [];
    if (Array.isArray(list)) {
      // ok
    } else if (Array.isArray(list.data)) {
      list = list.data;
    } else if (Array.isArray(list.countries)) {
      list = list.countries;
    } else {
      // Unknown shape
      return [];
    }

    // If items are strings, map to objects with defaults
    if (list.length && typeof list[0] === 'string') {
      return list.map((name) => ({
        name,
        phoneCode:
          name.toLowerCase() === 'australia'
            ? '+61'
            : name.toLowerCase() === 'india'
              ? '+91'
              : '+1',
        flagUrl: name
          ? `https://flagcdn.com/w320/${name.substring(0, 2).toLowerCase()}.png`
          : 'https://flagcdn.com/w320/us.png',
      }));
    }

    // Map and ensure required fields
    return list
      .map((c) => ({
        name: c.name || c.country || '',
        phoneCode: c.phoneCode || c.dial_code || c.code || '',
        flagUrl:
          c.flagUrl ||
          c.flag_url ||
          (c.iso2 ? `https://flagcdn.com/w320/${String(c.iso2).toLowerCase()}.png` : ''),
      }))
      .filter((c) => c.name && c.phoneCode);
  } catch (e) {
    console.warn('Failed to normalize countries:', e);
    return [];
  }
};

const DEFAULT_COUNTRIES = [
  { name: 'Australia', phoneCode: '+61', flagUrl: 'https://flagcdn.com/w320/au.png' },
  { name: 'USA', phoneCode: '+1', flagUrl: 'https://flagcdn.com/w320/us.png' },
  { name: 'UK', phoneCode: '+44', flagUrl: 'https://flagcdn.com/w320/gb.png' },
  { name: 'Canada', phoneCode: '+1', flagUrl: 'https://flagcdn.com/w320/ca.png' },
  { name: 'Germany', phoneCode: '+49', flagUrl: 'https://flagcdn.com/w320/de.png' },
  { name: 'France', phoneCode: '+33', flagUrl: 'https://flagcdn.com/w320/fr.png' },
  { name: 'India', phoneCode: '+91', flagUrl: 'https://flagcdn.com/w320/in.png' },
];

const DEFAULT_LANGUAGES = [
  'English',
  'Hindi',
  'Mandarin',
  'Spanish',
  'French',
  'German',
  'Arabic',
  'Portuguese',
  'Russian',
  'Japanese',
  'Korean',
  'Italian',
  'Other',
];

const UNIVERSITY_FALLBACKS = {
  india: [
    'Indian Institute of Technology Delhi',
    'Indian Institute of Technology Bombay',
    'Indian Institute of Technology Madras',
    'Indian Institute of Technology Kanpur',
    'Indian Institute of Technology Kharagpur',
    'Delhi University',
    'Jawaharlal Nehru University',
    'Banaras Hindu University',
  ],
  australia: [
    'University of Sydney',
    'University of Melbourne',
    'University of Queensland',
    'Monash University',
    'University of New South Wales',
    'Australian National University',
    'University of Western Australia',
  ],
  usa: [
    'Harvard University',
    'Stanford University',
    'Massachusetts Institute of Technology',
    'California Institute of Technology',
    'University of California, Berkeley',
    'Yale University',
    'Princeton University',
  ],
  uk: [
    'University of Oxford',
    'University of Cambridge',
    'Imperial College London',
    'University College London',
    'London School of Economics',
    'University of Edinburgh',
    "King's College London",
  ],
  canada: [
    'University of Toronto',
    'University of British Columbia',
    'McGill University',
    'University of Montreal',
    'University of Alberta',
    'McMaster University',
  ],
  germany: [
    'Technical University of Munich',
    'Ludwig Maximilian University of Munich',
    'Heidelberg University',
    'Karlsruhe Institute of Technology',
    'University of Freiburg',
    'RWTH Aachen University',
  ],
};

// ============================================================================
// RAW API FUNCTIONS
// ============================================================================

export const locationApi = {
  /**
   * Get all countries with phone codes and flags
   */
  getCountries: async () => {
    try {
      const { data } = await axiosInstance.get('/api/location/countries');
      const normalized = normalizeCountries(data);
      return normalized.length > 0 ? normalized : DEFAULT_COUNTRIES;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return DEFAULT_COUNTRIES;
    }
  },

  /**
   * Get states/provinces for a country
   */
  getStates: async (countryCode) => {
    if (!countryCode) return [];
    try {
      const { data } = await axiosInstance.get('/api/location/states', {
        params: { country: countryCode },
      });
      return data;
    } catch (error) {
      console.error('Error fetching states:', error);
      return [];
    }
  },

  /**
   * Get cities for a state/country
   */
  getCities: async (stateCode, countryCode) => {
    if (!stateCode || !countryCode) return [];
    try {
      const { data } = await axiosInstance.get('/api/location/cities', {
        params: { state: stateCode, country: countryCode },
      });
      return data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  },

  /**
   * Get available languages
   */
  getLanguages: async () => {
    try {
      const { data } = await axiosInstance.get('/api/location/languages');
      return data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      return DEFAULT_LANGUAGES;
    }
  },

  /**
   * Get universities for a specific country
   */
  getUniversities: async (country) => {
    if (!country) return [];
    const countryLower = country.toLowerCase();

    try {
      // Try main endpoint
      const { data } = await axiosInstance.get('/api/universities', {
        params: { country: countryLower },
      });
      return data;
    } catch (error) {
      // Try legacy endpoint
      try {
        const { data } = await axiosInstance.get('/api/location/universities', {
          params: { country: countryLower },
        });
        return data;
      } catch (legacyError) {
        console.error('Error fetching universities:', legacyError);

        // Return country-specific fallback
        if (countryLower.includes('india')) {
          return UNIVERSITY_FALLBACKS.india;
        } else if (countryLower.includes('australia')) {
          return UNIVERSITY_FALLBACKS.australia;
        } else if (countryLower.includes('usa') || countryLower.includes('united states')) {
          return UNIVERSITY_FALLBACKS.usa;
        } else if (
          countryLower.includes('uk') ||
          countryLower.includes('united kingdom') ||
          countryLower.includes('britain')
        ) {
          return UNIVERSITY_FALLBACKS.uk;
        } else if (countryLower.includes('canada')) {
          return UNIVERSITY_FALLBACKS.canada;
        } else if (countryLower.includes('germany')) {
          return UNIVERSITY_FALLBACKS.germany;
        }

        // Default fallback
        return UNIVERSITY_FALLBACKS.australia;
      }
    }
  },

  /**
   * Get courses/programs
   */
  getCourses: async () => {
    try {
      const { data } = await axiosInstance.get('/api/location/courses');
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return ['Computer Science', 'Medicine', 'Engineering', 'Business Administration', 'Law'];
    }
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get country by phone code
 */
export const getCountryByPhoneCode = (phoneCode, countries) => {
  return countries.find((country) => country.phoneCode === phoneCode);
};

/**
 * Get phone code by country name
 */
export const getPhoneCodeByCountry = (countryName, countries) => {
  const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
  return country ? country.phoneCode : '+61'; // Default to Australia
};

/**
 * Get flag by country name
 */
export const getFlagByCountry = (countryName, countries) => {
  const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
  return country ? country.flagUrl : 'https://flagcdn.com/w320/au.png';
};
