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

    async createVerificationToken(token) {
      const { identifier, token: hashedToken, expires } = token;
    
      await db.run(
        `INSERT OR REPLACE INTO verification_tokens (identifier, token, expires) VALUES (?, ?, ?)`,
        [identifier, hashedToken, expires]
      );
      return token;
    },
        
    useVerificationToken: async ({ identifier, token }) => {
      const tokenData = await db.get(
        `SELECT * FROM verification_tokens WHERE identifier = ? AND token = ?`,
        [identifier, token]
      );
    
      if (!tokenData) {
        throw new Error("Token no encontrado o inválido");
      }
    
      return tokenData;
    },       
  };
}