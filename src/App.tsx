import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Ui from "./pages/Ui";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import { ColourSchemePage } from "./pages/Organization";
import { ModuleOptionsPage, ModulePlaceholder } from "./pages/ModuleOptionsPage";
import { AppShell } from "./layouts/AppShell";
import { ModuleLayout } from "./layouts/ModuleLayout";
import { moduleNavItems } from "./lib/nav";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/demo" element={<Demo />} />

        {/* Application — AppShell owns chrome, ModuleLayout owns section nav */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/organization" element={<ModuleLayout title="ORGANIZATION" items={moduleNavItems("Organization")} />}>
            <Route index element={<Navigate to="company" replace />} />
            <Route path="company" element={
              <ModuleOptionsPage eyebrow="ORGANIZATION" title="Company"
                description="Identity details shown across your workspace."
                optionKeys={["Organization name", "Address", "Organization email", "Company website"]} />
            } />
            <Route path="localization" element={
              <ModuleOptionsPage eyebrow="ORGANIZATION" title="Localization"
                description="Regional defaults for dates, times and working hours."
                optionKeys={["Default time zone", "Date format", "Work week", "Standard hours per week"]} />
            } />
            <Route path="notifications" element={
              <ModuleOptionsPage eyebrow="ORGANIZATION" title="Notifications"
                description="Organization-wide notification preferences."
                optionKeys={["Email notifications", "Payroll reminders"]} />
            } />
            <Route path="colour-scheme" element={<ColourSchemePage />} />
          </Route>
          <Route path="/settings" element={<Navigate to="/organization" replace />} />

          <Route path="/leave" element={<ModuleLayout title="LEAVE" items={moduleNavItems("Leave")} />}>
            <Route index element={<Navigate to="types" replace />} />
            <Route path="types" element={<ModulePlaceholder eyebrow="LEAVE" title="Leave Types" />} />
            <Route path="holidays" element={<ModulePlaceholder eyebrow="LEAVE" title="Holidays" />} />
            <Route path="workflow" element={<ModulePlaceholder eyebrow="LEAVE" title="Workflow" />} />
            <Route path="settings" element={
              <ModuleOptionsPage eyebrow="LEAVE" title="Leave Settings"
                description="Leave entitlements and balance rules for your organization."
                optionKeys={["Annual leave allowance", "Sick leave allowance", "Leave year starts"]} />
            } />
          </Route>

          <Route path="/payroll" element={<ModuleLayout title="PAYROLL" items={moduleNavItems("Payroll")} />}>
            <Route index element={<Navigate to="pay-type" replace />} />
            <Route path="pay-type" element={<ModulePlaceholder eyebrow="PAYROLL" title="Pay Type" />} />
            <Route path="pay-group" element={<ModulePlaceholder eyebrow="PAYROLL" title="Pay Group" />} />
            <Route path="pay-process" element={<ModulePlaceholder eyebrow="PAYROLL" title="Pay Process" />} />
            <Route path="settings" element={
              <ModuleOptionsPage eyebrow="PAYROLL" title="Payroll Settings"
                description="Currency, pay cycles and approval steps for payroll."
                optionKeys={["Base currency", "Payroll frequency", "Payroll approval"]} />
            } />
          </Route>

          <Route path="/user-management" element={<ModuleLayout title="USER MANAGEMENT" items={moduleNavItems("User Management")} />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<ModulePlaceholder eyebrow="USER MANAGEMENT" title="Users" />} />
            <Route path="roles" element={<ModulePlaceholder eyebrow="USER MANAGEMENT" title="Roles" />} />
            <Route path="permissions" element={<ModulePlaceholder eyebrow="USER MANAGEMENT" title="Permissions" />} />
            <Route path="defaults" element={
              <ModuleOptionsPage eyebrow="USER MANAGEMENT" title="Defaults"
                description="Defaults applied when creating user accounts."
                optionKeys={["Default employee status"]} />
            } />
          </Route>

          <Route path="/security" element={<ModuleLayout title="SECURITY" items={moduleNavItems("Security")} />}>
            <Route index element={<Navigate to="password-policy" replace />} />
            <Route path="password-policy" element={<ModulePlaceholder eyebrow="SECURITY" title="Password Policy" />} />
            <Route path="session-timeout" element={
              <ModuleOptionsPage eyebrow="SECURITY" title="Session timeout"
                description="How long inactive sessions stay signed in."
                optionKeys={["Session timeout"]} />
            } />
            <Route path="two-factor" element={
              <ModuleOptionsPage eyebrow="SECURITY" title="Two-factor authentication"
                description="Additional verification required at sign in."
                optionKeys={["Two-factor authentication"]} />
            } />
            <Route path="sso" element={<ModulePlaceholder eyebrow="SECURITY" title="SSO" />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ui" element={<Ui />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}
