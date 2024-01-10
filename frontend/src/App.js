import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { PopupProvider } from './context/PopUpContext'


// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import User from './pages/User'
import Instruction from './pages/Instruction';
import Reminder from './pages/Reminder'
import ReminderPopUp from './components/ReminderPopUp'
import Spaces from './pages/Spaces'
import Admin from './pages/Admin'

function App() {
  const { user } = useAuthContext()

  return (
    <PopupProvider>
    <div className="App">
      
        <Navbar />
        {user && <ReminderPopUp />}
        <div className="pages">
          <Routes>
          <Route 
              path="/home" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/user" 
              element={user ? <User userId={user._id}/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user && user.role === 'admin' ? <Admin userRole={user.role}/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/ohjeet" 
              element={user ? <Instruction /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/muistutukset" 
              element={user ? <Reminder /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tilat" 
              element={user ? <Spaces /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      
    </div>
    </PopupProvider>

  );
}

export default App;

