import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography
} from '@mui/material';
import {
  Business,
  Build
} from '@mui/icons-material';
import ProjectModule from './ProjectModule';
import MotorModule from './MotorModule';

interface ProjectsMotorsLayoutProps {
  initialTab?: 'projects' | 'motors';
}

const ProjectsMotorsLayout: React.FC<ProjectsMotorsLayoutProps> = ({ 
  initialTab = 'projects' 
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'motors'>(initialTab);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedMotorId, setSelectedMotorId] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'projects' | 'motors') => {
    setActiveTab(newValue);
    // Limpiar selecciones cuando se cambia de pestaña
    setSelectedProjectId(null);
    setSelectedMotorId(null);
  };

  // Función para navegar a motores desde un proyecto
  const handleNavigateToMotors = (projectId: string, motorId?: string) => {
    setSelectedProjectId(projectId);
    setSelectedMotorId(motorId || 'PROJECT_LIST');
    setActiveTab('motors');
  };

  // Función para regresar a proyectos desde motores
  const handleBackToProjects = () => {
    setActiveTab('projects');
    setSelectedProjectId(null);
    setSelectedMotorId(null);
  };

  return (
    <Box>
      {/* Pestañas principales */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              backgroundColor: '#1e3a8a',
              height: 3
            }
          }}
        >
          <Tab
            icon={<Business />}
            iconPosition="start"
            label={
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Proyectos
              </Typography>
            }
            value="projects"
            sx={{
              minHeight: 64,
              px: 3,
              '&.Mui-selected': {
                color: '#1e3a8a',
                fontWeight: 'bold'
              }
            }}
          />
          <Tab
            icon={<Build />}
            iconPosition="start"
            label={
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Motores
              </Typography>
            }
            value="motors"
            sx={{
              minHeight: 64,
              px: 3,
              '&.Mui-selected': {
                color: '#1e3a8a',
                fontWeight: 'bold'
              }
            }}
          />
        </Tabs>
      </Paper>

      {/* Contenido de las pestañas */}
      <Box>
        {activeTab === 'projects' && (
          <ProjectModule 
            selectedProjectId={selectedProjectId}
            onClearSelectedProject={() => setSelectedProjectId(null)}
            onNavigateToMotors={handleNavigateToMotors}
          />
        )}
        {activeTab === 'motors' && (
          <MotorModule 
            selectedMotorId={selectedMotorId}
            onClearSelectedMotor={handleBackToProjects}
            selectedProjectId={selectedProjectId}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProjectsMotorsLayout; 