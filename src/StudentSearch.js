import React, { useState } from 'react';
import axios from 'axios';

function StudentSearch() {
    const [carnet, setCarnet] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://test-deploy-12.onrender.com/estudiantes/${carnet}`);
            setStudentData(response.data);
            setError('');
        } catch (err) {
            setError('No se encontró ningún estudiante con ese carnet.');
            setStudentData(null);
        }
    };

    const handleClear = () => {
        setCarnet('');
        setStudentData(null);
        setError('');
    };

    const handleCancel = () => {
        handleClear();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Búsqueda de Estudiante</h2>
            <div>
                <label>
                    Carnet:
                    <input
                        type="text"
                        value={carnet}
                        onChange={(e) => setCarnet(e.target.value)}
                        placeholder="Ingrese el número de carnet"
                    />
                </label>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={handleSearch}>Buscar</button>
                    <button onClick={handleClear} style={{ marginLeft: '10px' }}>Limpiar</button>
                    <button onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancelar</button>
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {studentData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Datos del Estudiante:</h3>
                    <p><strong>Nombre:</strong> {studentData.nombre}</p>
                    <p><strong>Correo Electrónico:</strong> {studentData.correo}</p>
                    <p><strong>Sección:</strong> {studentData.seccion}</p>
                </div>
            )}
        </div>
    );
}
export default StudentSearch;
