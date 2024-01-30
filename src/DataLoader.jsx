import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataLoader = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_GOOGLE_SHEETS_LINK);
                setData(response.data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Datos </h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataLoader;
