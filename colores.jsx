// function onEdit(e) {
//     var sheet = e.source.getActiveSheet();
//     var range = e.range;

//     // Verifica si la celda editada está en la hoja y en las columnas S o U
//     if (sheet.getName() == 'HOY' && (range.getColumn() == 19 || range.getColumn() == 21)) {
//         range.setBackground('#00FF00'); // Esto establecerá el fondo de la celda a verde
//     }

//     // Verifica si la celda editada es A2
//     if (range.getA1Notation() === 'A2') {
//         // Restablece los colores en las columnas S y U
//         sheet.getRange('S:U').setBackground(null);
//     }
// }

// function onSelectionChange(e) {
//     var sheet = e.source.getActiveSheet();
//     var range = e.range;
//     var greenColor = '#00FF00'; // Color verde
//     var defaultColor = '#FFFFFF'; // Color blanco (cambiar al color original de tus celdas)

//     // Verifica si la celda seleccionada está en la hoja y en las columnas S o U
//     if (sheet.getName() == 'HOY' && (range.getColumn() == 19 || range.getColumn() == 21)) {
//         if (range.getBackground() == greenColor) {
//             range.setBackground(defaultColor); // Restablece el color a blanco
//         } else {
//             range.setBackground(greenColor); // Establece el fondo de la celda a verde
//         }
//     }
// }
