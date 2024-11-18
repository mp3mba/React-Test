import Patients from './component/patients'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientDetails from './component/PatientDetails';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/patients/:patientID" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
