import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import VoterLogin from './pages/VoterLogin';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import Vote from './pages/Vote';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-layout">
      <Navbar />

      {/* ✅ This makes footer stay at bottom */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voter-login" element={<VoterLogin setUser={setUser} />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vote" element={<Vote user={user} />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
