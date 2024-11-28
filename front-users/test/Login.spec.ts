import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../src/@Pages/Login.vue';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../src/@Stores/authStore';

describe('Login.vue', () => {
  const mockRouterPush = vi.fn();
  let authStore: ReturnType<typeof useAuthStore>;

  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
  });

  router.push = mockRouterPush;

  beforeEach(() => {
    render(Login, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    });

    authStore = useAuthStore();
  });

  it('displays error message when login fails', async () => {
    authStore.login = vi.fn().mockRejectedValue(new Error('Invalid credentials'));

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await fireEvent.update(emailInput, 'test@example.com');
    await fireEvent.update(passwordInput, 'wrongpassword');
    await fireEvent.click(loginButton);

    expect(authStore.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('redirects to home page on successful login', async () => {
    authStore.login = vi.fn().mockResolvedValue(undefined);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await fireEvent.update(emailInput, 'test@example.com');
    await fireEvent.update(passwordInput, 'correctpassword');
    await fireEvent.click(loginButton);

    expect(authStore.login).toHaveBeenCalledWith('test@example.com', 'correctpassword');
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  it('disables submit button when email or password is empty', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).not.toBeDisabled();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await fireEvent.update(emailInput, 'test@example.com');
    expect(loginButton).not.toBeDisabled();

    await fireEvent.update(emailInput, '');
    await fireEvent.update(passwordInput, 'password123');
    expect(loginButton).not.toBeDisabled();
  });
});

