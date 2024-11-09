-- CreateTable
CREATE TABLE "clientes" (
    "cliente_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombres" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "cargo_actual" TEXT NOT NULL,
    "area_actual" TEXT NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    CONSTRAINT "clientes_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("empresa_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "empresas" (
    "empresa_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_empresa" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pruebas" (
    "prueba_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo_prueba" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "usuario" TEXT,
    "clave" TEXT
);

-- CreateTable
CREATE TABLE "cliente_pruebas" (
    "cliente_id" INTEGER NOT NULL,
    "prueba_id" INTEGER NOT NULL,
    "inicio_assessment" DATETIME NOT NULL,
    "fin_assessment" DATETIME NOT NULL,

    PRIMARY KEY ("cliente_id", "prueba_id"),
    CONSTRAINT "cliente_pruebas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cliente_pruebas_prueba_id_fkey" FOREIGN KEY ("prueba_id") REFERENCES "pruebas" ("prueba_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
