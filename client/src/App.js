import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import AppContext from './AppContext';

import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Historypage from './pages/Historypage';
function App() {

  // console.log("Starting APP")

  // console.log("Returning APP")


  return (
    //make a box with shadow effect
    //set the heading convert and charts
    //position the textboxes
    //display the converted currency value

    <>
      <AppContext>
        <Routes>
          <Route path="*" element={<Homepage />} />
          <Route path="/historypage" element={<Historypage />} />
        </Routes>
      </AppContext>
    </>
  );
}

export default App