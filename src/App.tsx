import React from 'react';
import Navbar from './components/Navbar';
import MainInteractionPage from './components/MainInteractionPage';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div className="font-sans dark:bg-gray-900">
        <Navbar />
        <MainInteractionPage />
      </div>
    </ThemeProvider>
  );
}

export default App;