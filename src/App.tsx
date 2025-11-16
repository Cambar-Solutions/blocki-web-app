import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PropertiesList from './pages/PropertiesList';
import MarketplaceHome from './pages/MarketplaceHome';
import { useWallet } from './hooks/useWallet';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000, // 30 seconds
    },
  },
});

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, isLoading } = useWallet();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isConnected) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="properties" element={<PropertiesList />} />
        <Route path="marketplace" element={<MarketplaceHome />} />

        {/* Placeholder routes - to be implemented */}
        <Route
          path="properties/:id"
          element={
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold">Property Detail Page</h2>
              <p className="text-muted-foreground mt-2">Coming soon...</p>
            </div>
          }
        />
        <Route
          path="properties/create"
          element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold">Create Property Page</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="marketplace/listings/:id"
          element={
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold">Listing Detail Page</h2>
              <p className="text-muted-foreground mt-2">Coming soon...</p>
            </div>
          }
        />
        <Route
          path="portfolio"
          element={
            <ProtectedRoute>
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold">Portfolio Page</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Page not found</p>
                <a
                  href="/"
                  className="text-primary hover:underline font-semibold"
                >
                  Go back home
                </a>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
