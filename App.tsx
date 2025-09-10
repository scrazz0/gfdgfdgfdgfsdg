
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, LocalizationProvider } from './contexts.tsx';
import { AuthProvider } from './AuthContext.tsx'; // Импортируем AuthProvider
import Layout from './components/Layout.tsx';
import HomePage from './components/HomePage.tsx';
import PropertiesPage from './components/PropertiesPage.tsx';
import AuthPage from './components/AuthPage.tsx';
import DashboardPage from './components/DashboardPage.tsx';
import StaticPages from './components/StaticPages.tsx';

function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <AuthProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="properties" element={<PropertiesPage />} />
                <Route path="how-it-works" element={<StaticPages page="how-it-works" />} />
                <Route path="about" element={<StaticPages page="about" />} />
              </Route>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/dashboard/*" element={<DashboardPage />} />
            </Routes>
          </HashRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;