import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; // Importa la biblioteca PapaParse para trabajar con archivos CSV
import './MainTable.css';

const MainTable1 = () => {
    const [data, setData] = useState([]);
    const [formattedToday, setFormattedToday] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_CSV_LINK, {
                    responseType: 'blob'
                });
                const csvData = response.data;

                Papa.parse(csvData, {
                    complete: function (result) {
                        setData(result.data);
                    },
                    header: true
                });
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchData();

        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        setFormattedToday(formattedDate);

    }, []);

    // Filtra las filas para mostrar la primera fila siempre en negrita y las filas donde el mensajero sea "CESAR" y la fecha sea la de hoy
    const filterData = data.filter((row, index) => {
        if (index === 0 || (row['MENSAJERX'] === 'CESAR' && row['FECHA'] === formattedToday)) {
            return true; // Mantener la primera fila siempre y las filas que cumplen la condición
        }
        return false; // Omitir las filas que no cumplen la condición
    });

    return (
        <div className="main-table-container">
            <h2>Pedidos filtrados CESAR de tabla general</h2>
            <table className="main-table">
                <thead>
                    <tr>
                        {/* Solo mostramos las primeras 26 columnas */}
                        {data.length > 0 && Object.keys(data[0]).slice(0, 26).map((key, index) => (
                            <th key={index} className={index === 0 ? "bold-row" : ""}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Mostramos todas las columnas */}
                            {Object.values(row).slice(0, 26).map((cell, cellIndex) => (
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

