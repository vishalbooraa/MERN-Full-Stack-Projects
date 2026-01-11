import './App.css'
import Authentication from './pages/authentication'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/home.jsx';
import ForgotPassword from './pages/forgotPassword';
import About from './pages/About/aboutPage.jsx';
import NoticeBoard from './pages/Noticeboard/noticeBoard.jsx';
import AddNewNotice from './pages/Noticeboard/addNewNotice.jsx';
import LostFoundForm from './pages/lostFound/lostFoundForm.jsx';
import AllLostFoundPage from './pages/lostFound/allLostFound.jsx';
import SchedulePage from './pages/Schedule/schedulePage.jsx';
import UploadSchedulePage from './pages/Schedule/uploadSchedulePage.jsx';
import NotesPage from './pages/Notes/notesPage.jsx';
import UploadNotes from './pages/Notes/uploadNotesPage.jsx';
import PyqPage from './pages/PYQ/pyqPage.jsx';
import UploadPyqPage from './pages/PYQ/uploadPyqPage.jsx';
import AiAssistantPage from './pages/Aiassistant/AiAssistantPage.jsx';
import ProtectedRoute from './pages/protectedRoutes.jsx';
import { AuthProvider } from './pages/authContext.jsx';


function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>} />
        <Route path="/noticeboard" element={<ProtectedRoute><NoticeBoard/></ProtectedRoute>} />
        <Route path="/addnewnotice" element={<ProtectedRoute><AddNewNotice/></ProtectedRoute>} />
        <Route path="/addlostfound" element={<ProtectedRoute><LostFoundForm/></ProtectedRoute>} />
        <Route path="/alllostfound" element={<ProtectedRoute><AllLostFoundPage/></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><SchedulePage/></ProtectedRoute>} />
        <Route path="/uploadschedule" element={<ProtectedRoute><UploadSchedulePage/></ProtectedRoute>} />
        <Route path="/notespage" element={<ProtectedRoute><NotesPage/></ProtectedRoute>} />
        <Route path="/uploadnotes" element={<ProtectedRoute><UploadNotes/></ProtectedRoute>} />
        <Route path="/pyqpage" element={<ProtectedRoute><PyqPage/></ProtectedRoute>} />
        <Route path="/uploadpyq" element={<ProtectedRoute><UploadPyqPage/></ProtectedRoute>} />
        <Route path="/aiassistant" element={<ProtectedRoute><AiAssistantPage/></ProtectedRoute>} />
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
