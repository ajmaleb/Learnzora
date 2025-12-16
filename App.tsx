
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';
import LoginPage from './components/LoginPage';
import { UserRole, AccessibilityConfig } from './types';
import ParticleBackground from './components/ParticleBackground';
import ParentsPortal from './components/ParentsPortal';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [activeTab, setActiveTab] = useState('student-dashboard');
  const [userData, setUserData] = useState<any>(null); // Store session user data

  // Accessibility State
  const [accessibility, setAccessibility] = useState<AccessibilityConfig>({
    font: 'Inter',
    bgTheme: 'Default',
    animations: true,
    alignment: 'justify' // Default tailwind is mostly left/justify mix, we will control this via class
  });

  const handleLogin = (selectedRole: UserRole, data?: any) => {
    setRole(selectedRole);
    setUserData(data);
    setIsLoggedIn(true);
    setActiveTab(selectedRole === UserRole.TEACHER ? 'dashboard' : selectedRole === UserRole.PARENT ? 'overview' : 'student-dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(UserRole.STUDENT);
    setUserData(null);
  }

  // Dynamic Styles Calculation
  const getAppStyles = () => {
    let styles: React.CSSProperties = {};
    let classes = "flex min-h-screen font-sans text-slate-900 transition-colors duration-300 ";

    // Font Family
    if (accessibility.font === 'Lexend') styles.fontFamily = "'Lexend', sans-serif";
    else if (accessibility.font === 'Atkinson Hyperlegible') styles.fontFamily = "'Atkinson Hyperlegible', sans-serif";
    else if (accessibility.font === 'OpenDyslexic') styles.fontFamily = "'Comic Sans MS', 'Chalkboard SE', sans-serif"; // Fallback simulation
    else styles.fontFamily = "'Inter', sans-serif";

    // Background Theme
    if (accessibility.bgTheme === 'Cream') classes += "bg-[#fdfbf7]/90 ";
    else if (accessibility.bgTheme === 'SoftBlue') classes += "bg-[#f0f8ff]/90 ";
    else classes += "bg-transparent "; // Allow animation to show through by default

    // Text Alignment
    if (accessibility.alignment === 'left') classes += "text-left ";

    return { styles, classes };
  };

  const { styles, classes } = getAppStyles();

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={classes} style={styles}>
      <ParticleBackground />
      {/* Animation Global Controller */}
      <style>
        {`
          *, *::before, *::after {
            ${!accessibility.animations ? 'animation: none !important; transition: none !important;' : ''}
          }
        `}
      </style>

      {role !== UserRole.PARENT && (
        <Sidebar
          currentRole={role}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1 h-screen overflow-hidden">
        {role === UserRole.TEACHER ? (
          <Dashboard view={activeTab} />
        ) : role === UserRole.PARENT ? (
          <ParentsPortal userData={userData} onLogout={handleLogout} />
        ) : (
          <LearningHub
            view={activeTab}
            onViewChange={setActiveTab}
            accessibility={accessibility}
            setAccessibility={setAccessibility}
            userData={userData}
          />
        )}
      </main>
    </div>
  );
};

export default App;
