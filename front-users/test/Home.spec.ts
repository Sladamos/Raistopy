import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../src/@Pages/Home.vue';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../src/@Stores/authStore';

describe('Home.vue', () => {
  const mockRouterPush = vi.fn();
  let authStore: ReturnType<typeof useAuthStore>;

  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
  });

  router.push = mockRouterPush;

  beforeEach(() => {
    render(Home, {
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

  it('displays login prompt when user is not authenticated', () => {
    authStore.isLoggedIn = false;
    expect(screen.getByText(/You are not authenticated./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('does not display user info and logout button when user is not authenticated', () => {
    authStore.isLoggedIn = false;

    render(Home, {
      global: {
        plugins: [
          createTestingPinia(),
          router,
        ],
      },
    });
    expect(screen.queryByText(/Welcome, test@example.com!/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });
});
