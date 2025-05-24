import { useEffect, useState } from 'react';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import LandingSite from './LandingSite.jsx';
import LoginPage from './Components/LoginPage.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import HabitTracker from './Components/HabitTracker.jsx';
import HabitReport from './Components/Report.jsx';
import './index.css';
import NotificationPage from './Components/NotificationPage.jsx';
import GoogleSuccessPage from './Components/GoogleSuccessPage.jsx';


function App() {
  useEffect(() => {
    document.title = "HabeoPrax - Smart Habit Tracking";
  }, []);

  return (<>

   <Routes>
      <Route path="/" element={<LandingSite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HabitTracker />} />
      <Route path="/reports/:userId" element={<HabitReport />} />
      <Route path="/notifications" element={<NotificationPage/>}/>
      <Route path="/google-success" element={<GoogleSuccessPage />} />

  </Routes>

</>
  );
}

export default App;




