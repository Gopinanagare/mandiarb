import { Link, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const { user, login, logout } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      // Simulate fetching user details or just set user as logged in
      login({ name: "Trader", token: tokenResponse.access_token });
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-surface-dim flex items-center justify-between px-margin-mobile w-full h-16 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-icon="agriculture">agriculture</span>
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Mandiarb</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors" data-icon="notifications">notifications</button>
          {!user ? (
            <button 
              onClick={() => handleGoogleLogin()} 
              className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-md flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-4 h-4" />
              Sign in
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-on-surface-variant hidden md:block">{user.name}</span>
              <button onClick={logout} className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold font-label-md hover:bg-primary hover:text-on-primary transition-colors">
                {user.name.charAt(0)}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Navigation Drawer (Hidden on mobile) */}
        <div className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-20 hover:w-64 bg-surface-bright shadow-xl group transition-all duration-300 z-40 flex-col py-6 overflow-hidden border-r border-outline-variant">
          <div className="space-y-4 px-4">
            <Link to="/" className={`flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low hover:text-primary transition-all ${path === '/' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined">swap_horiz</span>
              <span className="font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Arbitrage</span>
            </Link>
            <Link to="/markets" className={`flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low hover:text-primary transition-all ${path === '/markets' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined">search</span>
              <span className="font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Markets</span>
            </Link>
            <Link to="/analytics" className={`flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low hover:text-primary transition-all ${path === '/analytics' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined">insights</span>
              <span className="font-label-md opacity-0 group-hover:opacity-100 transition-opacity">Analytics</span>
            </Link>
            <Link to="/apis" className={`flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low hover:text-primary transition-all ${path === '/apis' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined">api</span>
              <span className="font-label-md opacity-0 group-hover:opacity-100 transition-opacity">APIs</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 md:ml-20">
          {children}
        </div>
      </div>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-lowest shadow-[0px_-4px_20px_rgba(95,116,100,0.06)] rounded-t-xl md:hidden">
        <Link to="/" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 active:scale-90 transition-transform ${path === '/' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">swap_horiz</span>
          <span className="font-label-md">Arbitrage</span>
        </Link>
        <Link to="/markets" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 active:scale-90 transition-transform ${path === '/markets' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-md">Markets</span>
        </Link>
        <Link to="/analytics" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 active:scale-90 transition-transform ${path === '/analytics' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">insights</span>
          <span className="font-label-md">Analytics</span>
        </Link>
        <Link to="/apis" className={`flex flex-col items-center justify-center rounded-full px-4 py-1 active:scale-90 transition-transform ${path === '/apis' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">api</span>
          <span className="font-label-md">APIs</span>
        </Link>
      </nav>
    </div>
  );
}
