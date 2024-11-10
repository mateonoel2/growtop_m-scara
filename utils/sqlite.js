import sqlite3 from "sqlite3";

// Ajusta la ruta para apuntar al archivo en la carpeta scripts
const db = new sqlite3.Database("./scripts/database.sqlite");

export const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM clientes WHERE email = ?", [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};