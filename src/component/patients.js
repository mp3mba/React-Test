import { useState, useEffect } from 'react';
import axios from 'axios';
import './Patient.css';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientData = await axios.get('http://41.188.172.204:30003/patients');
                setPatients(patientData.data.data.data);
                console.log(patientData.data.data.data);
            } catch (error) {
                setErrors(error);
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handlePatientClick = (patientID) => {
        window.open(`/patients/${patientID}`, '_blank');
    };

    return (
        <div>
            {errors && <div style={{ color: 'red' }}>Error: {errors.message}</div>}
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>Patient name</th>
                        <th>Patient number</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map((patient, index) => (
                            <tr
                                key={patient.Registration_ID || `patient-${index}`}
                                onClick={() => handlePatientClick(patient.Registration_ID)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{patient.Patient_Name}</td>
                                <td>{patient.Registration_ID}</td>
                                <td>{patient.Date_Of_Birth}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No patient data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Patients;
