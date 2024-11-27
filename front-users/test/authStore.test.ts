import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../src/@Stores/authStore';
import authService from '../src/services/authService';

vi.mock('../src/services/authService', () => ({
    default: {
        isAuthenticated: vi.fn(),
        login: vi.fn(),
        signup: vi.fn(),
        logout: vi.fn(),
        userId: vi.fn(),
      },
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  it('initializes with correct state', () => {
    (authService.isAuthenticated as Mock).mockReturnValue(false);
    const authStore = useAuthStore();

    expect(authStore.isLoggedIn).toBe(false);
    expect(authStore.user).toBeNull();
  });

  describe('actions', () => {
    it('logs in successfully', async () => {
      const mockUserId = '12345';
      (authService.login as Mock).mockResolvedValue(mockUserId);
      const authStore = useAuthStore();

      await authStore.login('test@example.com', 'password');

      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
      expect(authStore.isLoggedIn).toBe(true);
      expect(authStore.user).toEqual({
        id: mockUserId,
        email: 'test@example.com',
      });
    });

    it('signs up successfully', async () => {
      (authService.signup as Mock).mockResolvedValue(undefined);
      const authStore = useAuthStore();

      await authStore.signup('12345', 'test@example.com', 'password', 'password');

      expect(authService.signup).toHaveBeenCalledWith({
        id: '12345',
        email: 'test@example.com',
        password: 'password',
        passwordConfirm: 'password',
      });
    });

    it('throws an error if signup fails', async () => {
      (authService.signup as Mock).mockRejectedValue(new Error('Signup failed'));
      const authStore = useAuthStore();

      await expect(
        authStore.signup('12345', 'test@example.com', 'password', 'password')
      ).rejects.toThrow('Signup failed');

      expect(authService.signup).toHaveBeenCalledWith({
        id: '12345',
        email: 'test@example.com',
        password: 'password',
        passwordConfirm: 'password',
      });
    });

    it('logs out successfully', () => {
      const authStore = useAuthStore();
      authStore.isLoggedIn = true;
      authStore.user = { id: '12345', email: 'test@example.com' };

      authStore.logout();

      expect(authService.logout).toHaveBeenCalled();
      expect(authStore.isLoggedIn).toBe(false);
      expect(authStore.user).toBeNull();
    });

    it('returns the user ID when available', () => {
      const authStore = useAuthStore();
      authStore.user = { id: '12345', email: 'test@example.com' };

      const userId = authStore.getUserId();

      expect(userId).toBe('12345');
    });
  });
});
