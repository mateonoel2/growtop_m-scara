import sqlite3 from "sqlite3";

export const SQLiteAdapter = () => {
  const db = new sqlite3.Database("./scripts/database.sqlite", (err) => {
    if (err) {
      console.error("Error al conectar la base de datos SQLite:", err.message);
    }
  });

  // Configuración para evitar bloqueos
  db.run("PRAGMA busy_timeout = 5000");

  return {
    async getUserByEmail(email) {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM clientes WHERE correo = ?", [email], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row || null);
          }
        });
      });
    },

    async createVerificationToken(token) {
      const { identifier, token: hashedToken, expires } = token;

      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO verification_tokens (identifier, token, expires) VALUES (?, ?, ?)`,
          [identifier, hashedToken, expires],
          (err) => {
            if (err) {
              console.error("Error al crear el token de verificación:", err.message);
              reject(err);
            } else {
              resolve(token);
            }
          }
        );
      });
    },

    async useVerificationToken({ identifier, token }) {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT * FROM verification_tokens WHERE identifier = ? AND token = ?`,
          [identifier, token],
          (err, row) => {
            if (err) {
              reject(err);
            } else if (!row) {
              resolve(null);
            } else {
              db.run(
                `DELETE FROM verification_tokens WHERE identifier = ? AND token = ?`,
                [identifier, token],
                (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(row);
                  }
                }
              );
            }
          }
        );
      });
    },
  };
};