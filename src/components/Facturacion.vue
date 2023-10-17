<template>
    <v-container fluid>
        <v-sheet class="py-5">
            <h2>Facturación</h2>
        </v-sheet>
        <v-form>
            <v-row>
                <!-- Primera columna para completar datos del cliente -->
                <v-col cols="12" md="6">
                    <v-select v-model="factura" :items="tipoFactura" label="Tipo de factura"></v-select>
                    <v-text-field v-model="nombreCliente" label="Nombre completo" required></v-text-field>
                    <v-text-field v-model="dniCliente" label="DNI" required></v-text-field>
                    <v-text-field v-model="direccion" label="Dirección" required></v-text-field>
                    <v-text-field v-model="clienteLocalidad" label="Localidad" required></v-text-field>
                </v-col>
                <!-- Segunda columna para completar datos del cliente -->
                <v-col cols="12" md="6">
                    <v-text-field v-model="producto" label="Producto" required></v-text-field>
                    <v-select v-model="modalidadPago" :items="modalidadesPago" label="Modalidad de Pago"></v-select>
                    <v-text-field v-model="cantidad" label="Cantidad" type="number" required></v-text-field>
                    <v-text-field v-model="precio" label="Precio Unitario" type="number" required></v-text-field>
                </v-col>
            </v-row>
        </v-form>


        <div class="w-100 d-flex justify-center mt-4">
            <v-btn class="mr-4" color="primary" @click="() => printPdf(1)">Print PDF</v-btn>
            <v-btn color="success" @click="() => printPdf(2)">Generate PDF</v-btn>
        </div>


        <!-- Diálogo para mostrar la vista previa del PDF -->
        <v-dialog v-model="dialog" max-width="1200">
            <v-card>
                <v-card-title>
                    <span class="headline">Vista previa del PDF</span>
                </v-card-title>
                <v-card-text>
                    <iframe :src="pdfContent" width="100%" height="600px"></iframe>
                </v-card-text>
                <v-card-actions class="py-1 pl-6">
                    <v-btn color="white" class="bg-primary" @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
    
<script setup>
import { ref } from 'vue';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import QRCode from 'qrcode';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


const modalidadesPago = [
    'Tarjeta de crédito/debito',
    'Transferencia bancaria',
    'Efectivo',
];

const tipoFactura = [
    'Consumidor Final',
    'Responsable incripto'
];

const cuitEmpresa = ref('30-12345678-9');
const nombreCliente = ref('');
const direccion = ref('');
const clienteLocalidad = ref('');
const dniCliente = ref('');
const producto = ref('');
const cantidad = ref(0);
const precio = ref(0);
const factura = ref(null);
const modalidadPago = ref(null);
const dialog = ref(false);
const pdfContent = ref(null);


const facturaCount = ref(0);

const printPdf = (action) => {
    facturaCount.value++;

    const qrCodeUrl = 'https://jacgsaw.com/';
    const barcodeValue = '1234567890';

    const importeTotal = cantidad.value * precio.value;

    const datosProducto = {
        cantidad: cantidad.value,
        descripcion: producto.value,
        precio: precio.value,
        iva: '0%',
        bonificacion: 'NO',
        importeTotal: importeTotal,
    };


    const tipoFactura = () => {
        if (factura.value === 'Consumidor Final') {
            return 'B';
        } else if (factura.value !== 'Consumidor Final') {
            return 'A';
        } else {
            return 'C';
        }
    };

    const docDefinition = {
        content: [
            {
                columns: [
                    {
                        text: 'JACGSAW',
                        style: 'header',
                        width: '45%',
                    },
                    {
                        table: {
                            widths: [30],
                            // Ancho de la celda
                            body: [
                                [{ text: `${tipoFactura()}`, fontSize: 30, alignment: 'center', border: [true, true, true, true] }]
                            ]
                        },
                    },
                    {
                        text: [
                            {
                                text: 'ORIGINAL',
                                fontSize: 20,
                            },
                            `\n\nNúmero de Factura: 400 - ${facturaCount.value}\nFecha del día: ${getCurrentDate()}`,

                        ],

                        alignment: 'right',
                        width: '50%',
                    },
                ],
            },
            {
                style: 'section',
                text: 'jacgsaw s.a',
            },
            {
                text: 'Ciudad: Bogota',
            },
            {
                text: [
                    { text: 'https://jacgsaw.com/', link: 'https://jacgsaw.com/', color: 'blue' },
                ],
            },
            {
                text: 'Teléfono: 123456789',
            },
            {
                text: `CUIT: ${cuitEmpresa.value}`,
                margin: [0, 0, 0, 10],
            },
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'Datos del Cliente',
                                style: 'subheader',
                                alignment: 'center',
                                margin: [5, 5, 0, 5],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: `Nombre del Cliente: ${nombreCliente.value}`,
                                        width: '50%',
                                        margin: [0, 5, 0, 5],
                                    },
                                    {
                                        text: `DNI del Cliente: ${dniCliente.value}`,
                                        width: '50%',
                                        margin: [0, 5, 0, 5],
                                    },
                                ],
                            },
                        ],

                        [
                            {
                                columns: [
                                    {
                                        text: `Dirección: ${direccion.value}`,
                                        width: '50%',
                                        margin: [0, 5, 0, 5],
                                    },
                                    {
                                        text: `Localidad del Cliente: ${clienteLocalidad.value}`,
                                        width: '50%',
                                        margin: [0, 5, 0, 5],
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                columns: [
                                    {
                                        text: `Modalidad Pago: ${modalidadPago.value}`,
                                        width: '50%',
                                        margin: [0, 5, 0, 5],
                                    },
                                    {
                                        text: `Cond. impositiva: CONSUMIDOR FINAL`,
                                        width: '50%',
                                        margin: [0, 5, 0, 5],
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
            {
                margin: [0, 20, 0, 0],

                table: {
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
                    headerRows: 1,
                    body: [
                        ['CANTIDAD', 'DESCRIPCIÓN', 'PRECIO', 'IVA%', 'BONIFI', 'TOTAL'],
                        [
                            datosProducto.cantidad,
                            datosProducto.descripcion,
                            datosProducto.precio,
                            datosProducto.iva,
                            datosProducto.bonificacion,
                            datosProducto.importeTotal
                        ],
                    ]
                },
            },
        ],

        styles: {
            header: { fontSize: 24, bold: true },
            section: { fontSize: 17, bold: true },
            subheader: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] },
        },
    };

    if (action === 1) {
        pdfMake.createPdf(docDefinition).getDataUrl((dataURL) => {
            pdfContent.value = dataURL;
            dialog.value = true;
        });
    } else if (action === 2) {
        const pdf = pdfMake.createPdf(docDefinition);
        pdf.download(`factura_${facturaCount.value}.pdf`);
    }
};

function getCurrentDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

</script>
    
