// components/AuthProvider.tsx
import { useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { auth, refreshToken, showRefreshPrompt, hideRefreshPrompt, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    // Check token expiration
    const checkTokenExpiration = () => {
      const expiresIn = parseInt(auth.expires_in);
      const tokenExpiration = new Date(auth.session_state).getTime() + expiresIn * 1000;
      const timeUntilExpiration = tokenExpiration - Date.now();

      if (timeUntilExpiration < 300000) { // Show prompt 5 minutes before expiration
        useAuthStore.setState({ showRefreshPrompt: true });
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [auth]);

  const handleRefresh = async () => {
    const success = await refreshToken();
    if (!success) {
      logout();
      router.push('/welcome');
    }
  };

  return (
    <>
      {children}
      <AlertDialog open={showRefreshPrompt} onOpenChange={hideRefreshPrompt}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expiring Soon</AlertDialogTitle>
          </AlertDialogHeader>
          <p>Your session is about to expire. Would you like to extend it?</p>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleRefresh}>Refresh Session</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}