import { useRouter } from 'next/navigation';
import { useAuthStore } from '../welcome/store/authStore';

export const useAuthedFetch = () => {
  const { auth, refreshToken, logout } = useAuthStore();
  const router = useRouter();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    if (!auth?.access_token) {
      throw new Error('No auth token available');
    }

    // Add auth header
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${auth.access_token}`,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await refreshToken();
        if (refreshed) {
          // Retry the original request with new token
          return fetchWithAuth(url, options);
        } else {
          // Refresh failed, logout
          logout();
          router.push('/login');
          throw new Error('Session expired');
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  return { fetchWithAuth };
};