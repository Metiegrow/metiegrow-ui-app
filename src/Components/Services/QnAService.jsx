import axios from 'axios';
import { getAuthHeaders } from '../Auth/Auth.Function';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

export const QUESTION_TYPES = [
  'Admission purpose',
  'Career Guidance',
  'Visa Help',
  'Housing',
  'General',
];

class QnAService {
  async createQuestion(questionData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/qna/questions`,
        {
          questionType: questionData.questionType,
          title: questionData.title,
          description: questionData.description,
          userId: questionData.userId,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }

  async getQuestions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/qna/questions`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  }

  async getQuestionById(questionId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/qna/questions/${questionId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  }

  async createAnswer(answerData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/qna/answers`, answerData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
    }
  }

  async addAnswer(questionId, answerData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/qna/questions/${questionId}/answers`,
        answerData,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding answer:', error);
      throw error;
    }
  }
}

export default new QnAService();
