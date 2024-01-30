import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'papaparse'; // Importa la función parse de papaparse

const DataLoader = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_GOOGLE_SHEETS_LINK);
                const parsedData = parse(response.data, { header: true }); // Parsea los datos CSV
                setData(parsedData.data); // Almacena los datos en el estado
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Datos</h2>
            <table>
                <thead>
                    {data.length > 0 && (
                        <tr>
                            {Object.keys(data[0]).map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} style={{ border: '1px solid black' }}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataLoader;
