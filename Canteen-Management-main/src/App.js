import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import RedirectToBackend from "./components/RedirectToBackend";
import ScanPage from './components/ScanPage';


const App = () => {
  return (
    <Router basename="/Canteen-Management">
      <AuthProvider>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/latest-uid" element={<RedirectToBackend />} />
          {/* <Route path="/rfid-scan" element={<RFIDScan />} /> */}
          {/* <Route path="/api/latest-uid"  element={<Navigate to="http://localhost:5000/api/latest-uid" />} /> */}
          <Route path="/scan" element={<ScanPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;