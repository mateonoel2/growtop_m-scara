import mysql from "mysql2/promise";

export function CustomAdapter() {
  const pool = mysql.createPool({
    host: "localhost", 
    user: "root",     
    password: "",      
    database: "growtop_db", 
    waitForConnections: true, 
  });

  return {
    async createUser(user) {
      const { email, name, image } = user;
      const [result] = await pool.query(
        "INSERT INTO users (email, name, image) VALUES (?, ?, ?)",
        [email, name, image]
      );
      return { id: result.insertId, ...user };
    },

    async getUser(id) {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0] || null;
    },

    async getUserByEmail(email) {
      try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!rows || rows.length === 0) {
          return null; // Devuelve null si no se encuentra el usuario
        }
        return rows[0];
      } catch (error) {
        console.error("Error en getUserByEmail:", error);
        return null; // Siempre devuelve algo manejable
      }
    },    

    async getUserByAccount({ provider, providerAccountId }) {
      const [rows] = await pool.query(
        `SELECT users.* FROM users
         JOIN accounts ON users.id = accounts.userId
         WHERE accounts.provider = ? AND accounts.providerAccountId = ?`,
        [provider, providerAccountId]
      );
      return rows[0] || null;
    },

    async updateUser(user) {
      const { id, email, name, image } = user;
      await pool.query(
        "UPDATE users SET email = ?, name = ?, image = ? WHERE id = ?",
        [email, name, image, id]
      );
      return user;
    },

    async deleteUser(userId) {
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    },

    async linkAccount(account) {
      const {
        userId,
        provider,
        providerAccountId,
        refresh_token,
        access_token,
        expires_at,
      } = account;
      await pool.query(
        `INSERT INTO accounts
         (userId, provider, providerAccountId, refresh_token, access_token, expires_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, provider, providerAccountId, refresh_token, access_token, expires_at]
      );
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await pool.query(
        "DELETE FROM accounts WHERE provider = ? AND providerAccountId = ?",
        [provider, providerAccountId]
      );
    },

    async createSession({ sessionToken, userId, expires }) {
      await pool.query(
        "INSERT INTO sessions (sessionToken, userId, expires) VALUES (?, ?, ?)",
        [sessionToken, userId, expires]
      );
      return { sessionToken, userId, expires };
    },

    async getSessionAndUser(sessionToken) {
      const [rows] = await pool.query(
        `SELECT sessions.*, users.* FROM sessions
         JOIN users ON sessions.userId = users.id
         WHERE sessions.sessionToken = ?`,
        [sessionToken]
      );
      if (!rows[0]) return null;

      const { id, name, email, image, ...session } = rows[0];
      return {
        user: { id, name, email, image },
        session,
      };
    },

    async updateSession({ sessionToken, expires }) {
      await pool.query(
        "UPDATE sessions SET expires = ? WHERE sessionToken = ?",
        [expires, sessionToken]
      );
    },

    async deleteSession(sessionToken) {
      await pool.query("DELETE FROM sessions WHERE sessionToken = ?", [
        sessionToken,
      ]);
    },

    async createVerificationToken({ identifier, token, expires }) {
      await pool.query(
        "INSERT INTO verification_tokens (identifier, token, expires) VALUES (?, ?, ?)",
        [identifier, token, expires]
      );
      return { identifier, token, expires };
    },

    async useVerificationToken({ identifier, token }) {
      const [rows] = await pool.query(
        "SELECT * FROM verification_tokens WHERE identifier = ? AND token = ?",
        [identifier, token]
      );
      if (!rows[0]) return null;

      await pool.query(
        "DELETE FROM verification_tokens WHERE identifier = ? AND token = ?",
        [identifier, token]
      );
      return rows[0];
    },
  };
}