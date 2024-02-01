import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; // Importa la biblioteca PapaParse para trabajar con archivos CSV
import './MainTable.css';

const MainTable1 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_CSV_LINK, {
                    responseType: 'blob'
                });
                const csvData = response.data;

                Papa.parse(csvData, {
                    complete: function (result) {
                        // El resultado es un objeto con propiedades "data", "errors", etc.
                        // En "data" tendrás la matriz de datos CSV
                        setData(result.data);
                    },
                    header: true // Si tu archivo CSV tiene encabezados de columna, establece esto en true
                });
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };


        fetchData();
    }, []);

    // Filtra las filas para mostrar solo aquellas en las que la sexta columna tenga el valor "CESAR"
    const dataFiltrado = data.filter((row, index) => index === 1 || row[6] === 'CESAR');

    console.log('Datos en el estado:', data);

    return (
        <div>
            <h2>Pedidos filtrados CESAR de tabla general</h2>
            <table className="main-table">
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainTable1;
