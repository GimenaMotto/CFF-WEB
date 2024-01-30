// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MainTable = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(process.env.GOOGLE_SHEETS_MAIN_TABLE_LINK);
//                 console.log('Datos recibidos:', response.data);
//                 setData(response.data);
//             } catch (error) {
//                 console.error('Error al cargar los datos:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     console.log('Datos en el estado:', data);

//     // Obtener la fila 1 de los datos
//     const fila1 = data.length > 0 ? data[0] : null;

//     return (
//         <div>
//             <h2>Datos de la fila 1</h2>
//             {fila1 && (
//                 <pre>{JSON.stringify(data, null, 2)}</pre>
//             )}
//         </div>
//     );
// };

// export default MainTable;
