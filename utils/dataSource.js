import "reflect-metadata";
import { DataSource } from "typeorm";
import { Empresa } from "@/entities/Empresa";
import { Cliente } from "@/entities/Cliente";
import { ClientePrueba } from "@/entities/ClientePrueba";

let dataSource;

export const getDataSource = async () => {
    if (!dataSource) {
        dataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3309,
            username: "root",
            password: "",
            database: "growtop_db",
            entities: [Cliente, Empresa, ClientePrueba], // Agrega aquí todas tus entidades
            synchronize: true, // Solo para desarrollo
        });

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }

    return dataSource;
};