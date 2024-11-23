import sqlite3 from "sqlite3";

export const SQLiteAdapter = () => {
  const db = new sqlite3.Database("./scripts/database.sqlite");

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
        db.serialize(() => {
          // Evita conflictos eliminando tokens previos
          db.run(
            `DELETE FROM verification_tokens WHERE identifier = ?`,
            [identifier],
            (deleteErr) => {
              if (deleteErr) {
                reject(deleteErr);
              } else {
                db.run(
                  `INSERT INTO verification_tokens (identifier, token, expires) VALUES (?, ?, ?)`,
                  [identifier, hashedToken, expires],
                  (insertErr) => {
                    if (insertErr) {
                      reject(insertErr);
                    } else {
                      resolve(token);
                    }
                  }
                );
              }
            }
          );
        });
      });
    },

    useVerificationToken: async ({ identifier, token }) => {
      console.log("Buscando token:", identifier, token); // Log para verificar parámetros
    
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT * FROM verification_tokens WHERE identifier = ? AND token = ?`,
          [identifier, token],
          (err, row) => {
            if (err) {
              console.error("Error al buscar el token de verificación:", err.message);
              reject(err);
            } else if (!row) {
              console.warn("Token no encontrado:", { identifier, token });
              resolve(null);
            } else {
              console.log("Token encontrado:", row); // Log para confirmar token encontrado
    
              db.run(
                `DELETE FROM verification_tokens WHERE identifier = ? AND token = ?`,
                [identifier, token],
                (deleteErr) => {
                  if (deleteErr) {
                    console.error("Error al eliminar el token:", deleteErr.message);
                    reject(deleteErr);
                  } else {
                    console.log("Token eliminado correctamente.");
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