const sqlite3 = require('sqlite3').verbose();

// Conecta a la base de datos SQLite
const db = new sqlite3.Database('./scripts/database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Ejecuta la creación de la tabla verification_tokens
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS verification_tokens (
            identifier TEXT PRIMARY KEY,
            token TEXT,
            expires DATETIME
        );
    `, (err) => {
        if (err) {
            console.error('Error al crear la tabla verification_tokens:', err.message);
        } else {
            console.log('Tabla verification_tokens creada o ya existía');
        }
    });
});

// Cierra la conexión
db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos cerrada');
    }
});