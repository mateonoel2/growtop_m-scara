import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./scripts/database.sqlite");

export function SQLiteAdapter() {
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

    async createVerificationToken({ identifier, token, expires }) {
      return new Promise((resolve, reject) => {
        db.run(
          `DELETE FROM verification_tokens WHERE identifier = ?`,
          [identifier],
          (deleteErr) => {
            if (deleteErr) {
              return reject(deleteErr);
            }

            db.run(
              `INSERT INTO verification_tokens (identifier, token, expires) VALUES (?, ?, ?)`,
              [identifier, token, expires.toISOString()],
              function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve({ identifier, token, expires });
                }
              }
            );
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
            if (err || !row) {
              reject(err || new Error("Token no encontrado."));
            } else {
              db.run(
                `DELETE FROM verification_tokens WHERE identifier = ? AND token = ?`,
                [identifier, token],
                (delErr) => {
                  if (delErr) {
                    reject(delErr);
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
}