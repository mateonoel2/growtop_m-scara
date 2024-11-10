const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Crear tabla de empresas
    db.run(`
        CREATE TABLE IF NOT EXISTS empresas (
            empresa_id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_empresa TEXT
        );
    `);

    // Crear tabla de clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            cliente_id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombres TEXT,
            apellido_paterno TEXT,
            apellido_materno TEXT,
            correo TEXT,
            telefono TEXT,
            dni TEXT,
            cargo_actual TEXT,
            area_actual TEXT,
            empresa_id INTEGER,
            FOREIGN KEY (empresa_id) REFERENCES empresas(empresa_id)
        );
    `);

    // Crear tabla de pruebas
    db.run(`
        CREATE TABLE IF NOT EXISTS pruebas (
            prueba_id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_prueba TEXT,
            link TEXT,
            usuario TEXT,
            clave TEXT
        );
    `);

    // Crear tabla de cliente_pruebas para relacionar clientes y pruebas
    db.run(`
        CREATE TABLE IF NOT EXISTS cliente_pruebas (
            cliente_id INTEGER,
            prueba_id INTEGER,
            inicio_assessment TEXT,
            fin_assessment TEXT,
            FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
            FOREIGN KEY (prueba_id) REFERENCES pruebas(prueba_id)
        );
    `);
});

db.close();