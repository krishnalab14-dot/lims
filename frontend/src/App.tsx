import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SamplesPage } from './pages/SamplesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useUIStore } from './store/uiStore';
import './index.css';

const queryClient = new QueryClient();

function App() {
  const { isDarkMode } = useUIStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDarkMode ? 'dark' : ''}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/samples"
              element={
                <ProtectedRoute>
                  <SamplesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </QueryClientProvider>
  );
}

export default App;
