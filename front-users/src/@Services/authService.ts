import { sendRequest } from './apiRequestService';
import {SignupData} from "@/@Models/signupData";
import {LoginData} from "@/@Models/loginData";

export default {
  async signup(data: SignupData) {
    return sendRequest("PUT", `/backend/api/users/${data.id}`, data);
  },

  async login(data: LoginData) {
    const response = await sendRequest("POST", `/backend/api/users/login`, data);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.id);
    }
    return response.id;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return sendRequest("POST", '/backend/api/users/logout');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  userId(): string {
    return localStorage.getItem('userId') ?? '';
  }
};
  