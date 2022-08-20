import './App.scss';
import Login from './Components/Login/Login';
import LoginProvider from './context/auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadImage from './Components/UploadImage/UploadImage';
import Question from './Components/Question/Question';
import Game from './Components/Game/Game';

function App() {
  return (
    <>
      <LoginProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/uploadImages/:question_id" element={<UploadImage />} />
              <Route path="/question" element={<Question />} />
              <Route path="/game" element={<Game />} />


            </Routes>
          </BrowserRouter>
        </div>
      </LoginProvider>
    </>
  );
}

export default App;
