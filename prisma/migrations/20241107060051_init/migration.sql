-- CreateTable
CREATE TABLE `clientes` (
    `cliente_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(50) NOT NULL,
    `apellido_paterno` VARCHAR(50) NOT NULL,
    `apellido_materno` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(15) NOT NULL,
    `dni` VARCHAR(10) NOT NULL,
    `cargo_actual` VARCHAR(50) NOT NULL,
    `area_actual` VARCHAR(50) NOT NULL,
    `empresa_id` INTEGER NOT NULL,

    PRIMARY KEY (`cliente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `empresa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_empresa` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`empresa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pruebas` (
    `prueba_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_prueba` VARCHAR(50) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `usuario` VARCHAR(50) NOT NULL,
    `clave` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`prueba_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente_pruebas` (
    `cliente_id` INTEGER NOT NULL,
    `prueba_id` INTEGER NOT NULL,
    `inicio_assessment` DATETIME(3) NOT NULL,
    `fin_assessment` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cliente_id`, `prueba_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresas`(`empresa_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente_pruebas` ADD CONSTRAINT `cliente_pruebas_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`cliente_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente_pruebas` ADD CONSTRAINT `cliente_pruebas_prueba_id_fkey` FOREIGN KEY (`prueba_id`) REFERENCES `pruebas`(`prueba_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
