const articulos = [
    { codigo: 1, descripcion: "mouse inalámbrico", precio: 25.99, tipo: "Periféricos" },
    { codigo: 2, descripcion: "teclado mecánico", precio: 49.99, tipo: "Periféricos" },
    { codigo: 3, descripcion: "Monitor 24 pulgadas", precio: 179.99, tipo: "Electrónica" },
    { codigo: 4, descripcion: "Disco duro externo 1TB", precio: 89.99, tipo: "Electrónica" },
    { codigo: 5, descripcion: "Auriculares con micrófono", precio: 34.99, tipo: "Periféricos" },
    { codigo: 6, descripcion: "Cable HDMI 2m", precio: 12.99, tipo: "Accesorios" },
    { codigo: 7, descripcion: "Cargador USB-C", precio: 19.99, tipo: "Accesorios" },
    { codigo: 8, descripcion: "lámpara LED de escritorio", precio: 29.99, tipo: "Mobiliario" },
    { codigo: 9, descripcion: "Silla ergonómica", precio: 199.99, tipo: "Mobiliario" },
    { codigo: 10, descripcion: "webcam Full HD", precio: 69.99, tipo: "Electrónica" },
    { codigo: 11, descripcion: "Tarjeta de memoria 128GB", precio: 24.99, tipo: "Accesorios" },
    { codigo: 12, descripcion: "Base para laptop ajustable", precio: 39.99, tipo: "Mobiliario" },
    { codigo: 13, descripcion: "Router WiFi 6", precio: 129.99, tipo: "Electrónica" },
    { codigo: 14, descripcion: "Impresora multifuncional", precio: 249.99, tipo: "Electrónica" },
    { codigo: 15, descripcion: "smartwatch deportivo", precio: 59.99, tipo: "Electrónica" },
    { codigo: 16, descripcion: "Cámara de seguridad inalámbrica", precio: 99.99, tipo: "Electrónica" },
    { codigo: 17, descripcion: "Micrófono de condensador", precio: 74.99, tipo: "Periféricos" },
    { codigo: 18, descripcion: "Controlador MIDI", precio: 119.99, tipo: "Periféricos" },
    { codigo: 19, descripcion: "altavoz Bluetooth portátil", precio: 45.99, tipo: "Electrónica" },
    { codigo: 20, descripcion: "Kit de herramientas para PC", precio: 18.99, tipo: "Accesorios" }
];

// ============================================
// EJERCICIO 1: FUNCIONES CON ARRAYS
// ============================================

// (1) Filtrar artículos por tipo y precio máximo
const filtrarPorTipoYPrecio = (array, tipo, precioMax) => {
    // Usamos filter() con arrow function para crear un nuevo array
    return array.filter(articulo => articulo.tipo === tipo && articulo.precio <= precioMax);
};

// (2) Capitalizar descripciones (primera letra mayúscula, resto minúsculas)
const capitalizarDescripciones = (array) => {
    // Usamos map() para transformar cada elemento
    return array.map(articulo => {
        const desc = articulo.descripcion;
        const capitalizada = desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase();
        
        // Devolvemos un nuevo objeto con spread operator
        return {
            ...articulo,
            descripcion: capitalizada
        };
    });
};

// (3) Buscar artículos que contengan una cadena en la descripción
const buscarPorCadena = (array, cadena) => {
    const cadenaBusqueda = cadena.toLowerCase();
    
    return array.filter(articulo => 
        articulo.descripcion.toLowerCase().includes(cadenaBusqueda)
    );
};

// (4) Calcular cantidad y precio medio de artículos de un tipo
const calcularEstadisticasPorTipo = (array, tipo) => {
    const articulosTipo = array.filter(articulo => articulo.tipo === tipo);
    const cantidad = articulosTipo.length;
    
    if (cantidad === 0) {
        return { cantidad: 0, preciomedio: 0 };
    }
    
    const sumaPrecios = articulosTipo.reduce((acum, articulo) => acum + articulo.precio, 0);
    const preciomedio = Math.round((sumaPrecios / cantidad) * 100) / 100;
    
    return { cantidad, preciomedio };
};

// (5) Reorganizar array por precio (ascendente o descendente)
const ordenarPorPrecio = (array, orden) => {
    // Creamos una copia con spread operator
    const arrayOrdenado = [...array];
    
    arrayOrdenado.sort((a, b) => {
        return orden === "ascendente" || orden === "asc" 
            ? a.precio - b.precio 
            : b.precio - a.precio;
    });
    
    return arrayOrdenado;
};

// ============================================
// EJERCICIO 2: CLASE BANCO
// ============================================

class Banco {
    // (6) Constructor con el nombre del banco
    constructor(nombre) {
        this.nombre = nombre;
        this.cuentas = {};
    }
    
    // (7) Crear cuenta
    crearCuenta(codigo, saldoInicial = 0) {
        if (codigo < 1 || codigo > 599999) {
            console.error("Error: El código debe estar entre 000001 y 599999");
            return;
        }
        
        if (this.cuentas.hasOwnProperty(codigo)) {
            console.error(`Error: La cuenta ${codigo} ya existe`);
            return;
        }
        
        this.cuentas[codigo] = saldoInicial;
        console.log(`Cuenta ${codigo} creada con saldo: ${saldoInicial}€`);
    }
    
    // (8) Actualizar cuenta
    actualizarCuenta(codigo, cantidad) {
        if (!this.cuentas.hasOwnProperty(codigo)) {
            console.error(`Error: La cuenta ${codigo} no existe`);
            return;
        }
        
        this.cuentas[codigo] += cantidad;
        const operacion = cantidad >= 0 ? "Ingreso" : "Extracción";
        console.log(`${operacion} de ${cantidad}€ en cuenta ${codigo}. Nuevo saldo: ${this.cuentas[codigo]}€`);
    }
    
    // (9) Eliminar cuenta
    eliminarCuenta(codigo) {
        if (!this.cuentas.hasOwnProperty(codigo)) {
            console.error(`Error: La cuenta ${codigo} no existe`);
            return;
        }
        
        if (this.cuentas[codigo] !== 0) {
            console.error(`Error: La cuenta ${codigo} no se puede eliminar porque tiene saldo: ${this.cuentas[codigo]}€`);
            return;
        }
        
        delete this.cuentas[codigo];
        console.log(`Cuenta ${codigo} eliminada correctamente`);
    }
    
    // (10) Listar cuentas en el documento (usando DOM nativo)
    listarCuentas() {
        const contenedor = document.getElementById('listado-cuentas');
        
        // Limpiamos el contenedor
        contenedor.innerHTML = '';
        
        // Creamos el título
        const titulo = document.createElement('h2');
        titulo.textContent = `Banco: ${this.nombre}`;
        contenedor.appendChild(titulo);
        
        // Creamos la tabla
        const tabla = document.createElement('table');
        tabla.setAttribute('border', '1');
        tabla.setAttribute('cellpadding', '10');
        tabla.style.borderCollapse = 'collapse';
        tabla.style.width = '100%';
        tabla.style.maxWidth = '600px';
        tabla.style.margin = '20px auto';
        tabla.style.background = '#fff';
        tabla.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        
        // Creamos el encabezado
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const th1 = document.createElement('th');
        th1.textContent = 'Código de Cuenta';
        th1.style.background = '#0066cc';
        th1.style.color = 'white';
        th1.style.padding = '12px';
        th1.style.textAlign = 'left';
        
        const th2 = document.createElement('th');
        th2.textContent = 'Saldo (€)';
        th2.style.background = '#0066cc';
        th2.style.color = 'white';
        th2.style.padding = '12px';
        th2.style.textAlign = 'left';
        
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        thead.appendChild(headerRow);
        tabla.appendChild(thead);
        
        // Creamos el cuerpo de la tabla
        const tbody = document.createElement('tbody');
        
        let contador = 0;
        for (const codigo in this.cuentas) {
            if (this.cuentas.hasOwnProperty(codigo)) {
                const tr = document.createElement('tr');
                
                // Alternamos colores de fila
                if (contador % 2 === 0) {
                    tr.style.background = '#f9f9f9';
                }
                
                const td1 = document.createElement('td');
                td1.textContent = codigo;
                td1.style.padding = '10px';
                
                const td2 = document.createElement('td');
                td2.textContent = this.cuentas[codigo].toFixed(2);
                td2.style.padding = '10px';
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
                
                contador++;
            }
        }
        
        tabla.appendChild(tbody);
        contenedor.appendChild(tabla);
    }
}

// ============================================
// PRUEBAS Y LLAMADAS A LAS FUNCIONES
// ============================================

console.log("========== EJERCICIO 1 ==========");

// Prueba función (1)
console.log("\n(1) Artículos de tipo 'Electrónica' con precio <= 100€:");
console.log(filtrarPorTipoYPrecio(articulos, "Electrónica", 100));

// Prueba función (2)
console.log("\n(2) Descripciones capitalizadas:");
const articulosCapitalizados = capitalizarDescripciones(articulos);
console.log(articulosCapitalizados.slice(0, 5));

// Prueba función (3)
console.log("\n(3) Artículos que contienen 'USB':");
console.log(buscarPorCadena(articulos, "USB"));

// Prueba función (4)
console.log("\n(4) Estadísticas de artículos tipo 'Electrónica':");
console.log(calcularEstadisticasPorTipo(articulos, "Electrónica"));

// Prueba función (5)
console.log("\n(5) Artículos ordenados por precio descendente:");
console.log(ordenarPorPrecio(articulos, "descendente").slice(0, 5));

console.log("\n========== EJERCICIO 2 ==========");

// Creamos un objeto banco
const miBanco = new Banco("Banco Carlos3");

// (7) Creamos las 3 cuentas
console.log("\nCreando cuentas:");
miBanco.crearCuenta(100001, 1000);
miBanco.crearCuenta(100002, 500);
miBanco.crearCuenta(100003, 0);

// (8) Actualizamos una cuenta
console.log("\nActualizando cuentas:");
miBanco.actualizarCuenta(100001, 250);
miBanco.actualizarCuenta(100002, -100);
miBanco.actualizarCuenta(999999, 100);

// (9) Eliminamos una cuenta
console.log("\nEliminando cuentas:");
miBanco.eliminarCuenta(100003);
miBanco.eliminarCuenta(100001);
miBanco.eliminarCuenta(999999);

// (10) Listamos todas las cuentas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log("\nListado de cuentas (ver en la página HTML):");
    miBanco.listarCuentas();
});