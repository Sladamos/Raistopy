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
    console.log(response)
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.id);
    }
    return response.id;
  },

  logout() {
    localStorage.removeItem('token');
    return sendRequest("POST", '/backend/api/users/logout');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  userId(): string {
    return localStorage.getItem('userId') ?? '';
  }
};
  