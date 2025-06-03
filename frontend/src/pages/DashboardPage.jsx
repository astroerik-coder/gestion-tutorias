"use client";

import { useUserRole } from "../hooks/useUserRole";
import { useDashboard } from "../hooks/useDashboard";
import { Box, Container, Typography } from "@mui/material";

import AppBar from "../components/dashboard/AppBar";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import TutorDashboard from "../components/dashboard/TutorDashboard";
import CoordinatorDashboard from "../components/dashboard/CoordinatorDashboard";
import Sidebar from "../components/dashboard/Sidebar";
import RequestTutorialModal from "../components/dashboard/modals/RequestTutorialModal";
import PublishScheduleModal from "../components/dashboard/modals/PublishScheduleModal";
import FeedbackModal from "../components/dashboard/modals/FeedbackModal";
import AddUserModal from "../components/dashboard/modals/AddUserModal";
import UsersSection from "../components/dashboard/sections/UsersSection";
import StatisticsSection from "../components/dashboard/sections/StatisticsSection";
import AuditPage from "../pages/AuditPage";
import ManageRequestsSection from "../components/dashboard/sections/ManageRequestsSection";
import { solicitudService } from "../services/api"; // Asegúrate que esté importado

export default function DashboardPage() {
  const { user, role, setRole } = useUserRole();
  const {
    sidebarOpen,
    setSidebarOpen,
    activeSection,
    setActiveSection,
    requestDialogOpen,
    setRequestDialogOpen,
    scheduleDialogOpen,
    setScheduleDialogOpen,
    feedbackDialogOpen,
    setFeedbackDialogOpen,
    selectedSession,
    addUserDialogOpen,
    setAddUserDialogOpen,
    userTab,
    setUserTab,
    requestForm,
    setRequestForm,
    scheduleForm,
    setScheduleForm,
    userForm,
    setUserForm,
    sessions,
    requests,
    students,
    tutors,
    statistics,
    recentActivity,
    handleRequestSubmit,
    handleScheduleSubmit,
    handleFeedbackSubmit,
    handleUserSubmit,
    handleRequestStatus,
    loading,
    error,
  } = useDashboard();

  // Verificación del rol antes de renderizar el dashboard
  if (!role) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h6">Cargando perfil...</Typography>
      </Box>
    );
  }

  const fetchRequests = async () => {
    try {
      const data = await solicitudService.getSolicitudes();
      setRequestForm(data); // ← esto está mal
    } catch (error) {
      console.error("Error al refrescar solicitudes:", error);
    }
  };
  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        switch (role) {
          case "estudiante":
            return (
              <StudentDashboard
                sessions={sessions}
                requests={requests}
                loading={loading}
                error={error}
              />
            );
          case "tutor":
            return (
              <TutorDashboard
                sessions={sessions}
                requests={requests}
                onRequestStatus={handleRequestStatus}
              />
            );
          case "coordinador":
            return (
              <CoordinatorDashboard
                statistics={statistics}
                recentActivity={recentActivity}
              />
            );
          default:
            return null;
        }

      case "users":
        return (
          <UsersSection
            userTab={userTab}
            onTabChange={setUserTab}
            students={students}
            tutors={tutors}
            onAddUser={() => setAddUserDialogOpen(true)}
            onEditUser={(user) => console.log("Editar usuario:", user)}
            onDeleteUser={(userId) => console.log("Eliminar usuario:", userId)}
          />
        );

      case "manage-requests":
        return (
          <ManageRequestsSection
            requests={requests}
            onAddRequest={() => setRequestDialogOpen(true)}
            onEstadoActualizado={fetchRequests}
          />
        );

      case "statistics":
        return (
          <StatisticsSection
            tutors={tutors}
            subjects={statistics?.subjects || []}
          />
        );

      case "audit":
        return <AuditPage />;
      default:
        return (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Esta sección está en desarrollo.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        role={role}
        onRoleChange={setRole}
        user={user}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: { xs: 8, sm: 9 },
          backgroundColor: "background.default",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 2,
            px: { xs: 2, sm: 3 },
          }}
        >
          {renderMainContent()}
        </Container>
      </Box>

      <RequestTutorialModal
        open={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        form={requestForm}
        onFormChange={setRequestForm}
        onSubmit={handleRequestSubmit}
      />

      <PublishScheduleModal
        open={scheduleDialogOpen}
        onClose={() => setScheduleDialogOpen(false)}
        form={scheduleForm}
        onFormChange={setScheduleForm}
        onSubmit={handleScheduleSubmit}
      />

      <FeedbackModal
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        session={selectedSession}
        onSubmit={handleFeedbackSubmit}
      />

      <AddUserModal
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        form={userForm}
        onFormChange={setUserForm}
        onSubmit={handleUserSubmit}
      />
    </Box>
  );
}
