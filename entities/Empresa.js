import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("empresas") // Nombre de la tabla en la base de datos
export class Empresa {
    @PrimaryGeneratedColumn()
    empresa_id;

    @Column()
    nombre_empresa;
}