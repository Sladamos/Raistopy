import { sendRequest } from './apiRequestService';

interface SignupData {
  id: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface LoginData {
  email: string;
  password: string;
}

export default {
  async signup(data: SignupData) {
    return sendRequest("PUT", `/backend/api/users/${data.id}`, data);
  },

  async login(data: LoginData) {
    const response = await sendRequest("POST", `/backend/api/users/login`, data);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  logout() {
    localStorage.removeItem('token');
    return sendRequest("POST", '/backend/api/users/logout');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};
  