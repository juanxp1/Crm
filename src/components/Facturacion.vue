<template>
    <v-container fluid>
        <v-form @submit.prevent="generarFactura">
            <h2>Facturación</h2>
            <v-text-field v-model="nombreCliente" label="Nombre del Cliente" required></v-text-field>
            <v-text-field v-model="direccion" label="Dirección" required></v-text-field>
            <v-text-field v-model="producto" label="Producto" required></v-text-field>
            <v-text-field v-model="cantidad" label="Cantidad" type="number" required></v-text-field>
            <v-text-field v-model="precio" label="Precio Unitario" type="number" required></v-text-field>
            <v-btn type="submit" class="mt-4" color="primary">Generar Factura PDF</v-btn>
        </v-form>
    </v-container>
</template>
  
<script setup>
import logo from '../assets/blanco.png'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';
import { ref } from 'vue';
const nombreCliente = ref('Probando');
const direccion = ref('Probando 1242');
const producto = ref(' probando Rojo');
const cantidad = ref(5);
const precio = ref(15);

let numeroFactura = 1;  // Contador para el número de factura

const generarFactura = () => {
    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString();

    // Formatear el número de factura con ceros a la izquierda
    const numeroFacturaFormateado = numeroFactura.toString().padStart(6, '0');

    // Actualizar el número de factura para la próxima vez
    numeroFactura++;

    const doc = new jsPDF();

    // Agregar el logo y texto "Jacgsaw System"
    const logoWidth = 30;
    const logoHeight = 30;
    doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);
    doc.setFontSize(28);
    doc.text('Jacgsaw System', 40, 30);

    // Definir el contenido para el PDF
    const contenido = [
        [{ content: 'Factura de Venta', colSpan: 2, styles: { fontStyle: 'bold', fontSize: 16 }, alignment: 'center' },],
        ['Número de Factura:', numeroFacturaFormateado],
        ['Fecha:', fechaActual],
        ['Nombre del Cliente:', nombreCliente.value],
        ['Dirección:', direccion.value],
        ['Producto:', producto.value],
        ['Cantidad:', cantidad.value],
        ['Precio Unitario:', `$${precio.value}`],
        ['Total:', `$${cantidad.value * precio.value}`]
    ];

    // Configurar la tabla en el PDF
    doc.autoTable({
        startY: 70, // Iniciar a partir de esta posición después del logo y texto
        body: contenido
    });

    // Generar el código QR
    const qrData = 'https://jacgsaw.com/';  // Asegúrate de que qrData contenga una URL válida
    const qrOptions = {
        margin: 0.5,
        scale: 4,
        width: 40,
        height: 40
    };

    // Crear un elemento HTML para el código QR
    const qrCanvas = document.createElement('canvas');
    QRCode.toCanvas(qrCanvas, qrData, qrOptions, (error) => {
        if (error) {
            console.error('Error generando el código QR:', error);
            return;
        }

        // Convertir el elemento HTML a una imagen
        const qrDataURL = qrCanvas.toDataURL('image/png');

        // Agregar el código QR al PDF
        doc.addImage(qrDataURL, 'PNG', 150, 10, qrOptions.width, qrOptions.height);

        // Guardar el PDF o mostrarlo en una nueva ventana
        doc.save(`factura_${numeroFacturaFormateado}.pdf`);
    });
};

</script>

  


<style scoped></style>