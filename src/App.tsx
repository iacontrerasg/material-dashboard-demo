import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardHome from './components/DashboardHome';
import ContractModule from './components/ContractModule';
import MotorModule from './components/MotorModule';
import { Box, Typography } from '@mui/material';

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

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'contratos':
        return <ContractModule />;
      case 'motores':
        return <MotorModule />;
      case 'configuracion':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Configuración del Sistema
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Módulo de configuración - Próximamente
            </Typography>
          </Box>
        );
      default:
        return <DashboardHome />;
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
