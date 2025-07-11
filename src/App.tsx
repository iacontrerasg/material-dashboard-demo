import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardHome from './components/DashboardHome';
import ProjectsMotorsLayout from './components/ProjectsMotorsLayout';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a',
    },
    secondary: {
      main: '#374151',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Componente que maneja el contenido principal
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const handleNavigateToProject = () => {
    setSelectedSection('contratos');
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <DashboardHome onNavigateToProject={handleNavigateToProject} />;
      case 'contratos':
        return <ProjectsMotorsLayout />;
      default:
        return <DashboardHome onNavigateToProject={handleNavigateToProject} />;
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Dashboard 
      selectedSection={selectedSection}
      onSectionChange={setSelectedSection}
    >
      {renderContent()}
    </Dashboard>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
