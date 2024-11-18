import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PatientDetails() {
    const { patientID } = useParams();
    const [patient, setPatient] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const res = await axios.get(`http://41.188.172.204:30003/patients/${patientID}`);
                setPatient(res.data);
                console.log('Patient Details:', res);
            } catch (error) {
                console.error('Error fetching patient details:', error);
                setErrors(error);
            }
        };

        fetchPatientDetails();
    }, [patientID]);

    return (
        <div>
            {errors && <div style={{ color: 'red' }}>Error: {errors.message}</div>}
            {patient ? (
                <div>
                    <h2>Patient Details</h2>
                    <p><strong>Patient Region:</strong> {patient.Region}</p>
                    <p><strong>Patient Ward:</strong> {patient.Ward}</p>
                    <p><strong>Patient Guarantor:</strong> {patient.Sponsor}</p>
                </div>
            ) : (
                <p>Loading patient details...</p>
            )}
        </div>
    );
}

export default PatientDetails;
