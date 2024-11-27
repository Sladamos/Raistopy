import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import Home from '../src/@Pages/home.vue';
import { useAuthStore } from '../src/@Stores/authStore';
import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';
import { useToast } from 'vue-toast-notification';

vi.mock('vue-toast-notification', () => ({
  useToast: vi.fn(() => ({
    success: vi.fn(),
  })),
}));

// Mock the authStore
vi.mock('../@Stores/authStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('Home Component', () => {
  let authStoreMock: any;
  let toastMock: any;

  beforeEach(() => {
    setActivePinia(createPinia()); // Set up Pinia store
    authStoreMock = {
      isLoggedIn: false,
      user: null,
      logout: vi.fn(),
    };

    // Mock the authStore to return mock data
    (useAuthStore as Mock).mockReturnValue(authStoreMock);

    // Mock the toast
    toastMock = {
      success: vi.fn(),
    };
    (useToast as Mock).mockReturnValue(toastMock);
  });

  it('displays the login screen when not authenticated', async () => {
    const wrapper = mount(Home);

    // Check that the login message is shown when not logged in
    expect(wrapper.text()).toContain('You are not authenticated.');
    expect(wrapper.text()).toContain('Login');
    expect(wrapper.text()).toContain("Don't have an account? Register");

    // Ensure the toast messages are called
    expect(toastMock.success).toHaveBeenCalledTimes(3);
  });

  it('displays the user email when authenticated', async () => {
    authStoreMock.isLoggedIn = true;
    authStoreMock.user = { email: 'test@example.com' };
    
    const wrapper = mount(Home);

    // Check if user email is displayed
    expect(wrapper.text()).toContain('Welcome, test@example.com');
    expect(wrapper.find('button').text()).toBe('Logout');
  });

  it('logs out when the logout button is clicked', async () => {
    authStoreMock.isLoggedIn = true;
    authStoreMock.user = { email: 'test@example.com' };

    const wrapper = mount(Home);

    // Find the logout button and simulate a click
    const logoutButton = wrapper.find('button');
    await logoutButton.trigger('click');

    // Ensure logout was called and the page was reloaded
    expect(authStoreMock.logout).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('displays the login page when logout is clicked', async () => {
    authStoreMock.isLoggedIn = false;
    const wrapper = mount(Home);

    // Simulate clicking on the "Login" link
    const loginLink = wrapper.find('a[href="/login"]');
    await loginLink.trigger('click');

    // Check if the page redirected to the login page
    expect(loginLink.attributes().href).toBe('/login');
  });

  it('shows toast messages on mount', async () => {
    authStoreMock.isLoggedIn = false;
    const wrapper = mount(Home);

    // Check that toast messages are shown on mount
    expect(toastMock.success).toHaveBeenCalledWith('Welcome to the Home Page!', expect.any(Object));
    expect(toastMock.success).toHaveBeenCalledWith('Logged users can add bus stops to favorites', expect.any(Object));
  });
});
