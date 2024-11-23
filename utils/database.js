const sqlite3 = require("sqlite3");
const databasePath = "C:/Users/Eduardo/OneDrive/growtop_m-scara/scripts/database.sqlite"; // Ruta a tu base de datos

const initializeDatabase = () => {
  const db = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Error al abrir la base de datos:", err.message);
    } else {
      db.run("PRAGMA busy_timeout = 5000", (err) => {
        if (err) {
          console.error("Error al configurar PRAGMA busy_timeout:", err.message);
        }
      });
    }
  });
  return db;
};

module.exports = { initializeDatabase };