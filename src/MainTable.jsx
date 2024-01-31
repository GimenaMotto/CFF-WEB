import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import './MainTable.css';

const MainTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_WEB_PAGE_LINK);
                const html = response.data;
                const parsedHtml = parse(html); // Parsea el HTML
                const table = parsedHtml.querySelector('table'); // Encuentra la tabla en el HTML
                const tableRows = table.querySelectorAll('tr'); // Encuentra todas las filas de la tabla

                // Convierte las filas de la tabla en un arreglo de arreglos de celdas
                const parsedData = tableRows.map(row =>
                    Array.from(row.querySelectorAll('td, th')).map(cell => cell.textContent.trim())
                );

                setData(parsedData); // Almacena los datos en el estado
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
                <tbody>
                    {dataFiltrado.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex === 0 ? "bold-row" : ""}>
                            {/* Ignorar la primera celda de cada fila */}
                            {row.slice(1, 27).map((cell, cellIndex) => (
                                <td key={cellIndex}>
                                    {/* Envuelve las celdas de la fila 1 en negrita */}
                                    {rowIndex === 0 ? <strong>{cell}</strong> : cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainTable;
