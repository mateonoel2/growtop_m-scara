import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Empresa } from "./Empresa";

@Entity("clientes") // Nombre de la tabla
export class Cliente {
    @PrimaryGeneratedColumn()
    cliente_id;

    @Column()
    nombres;

    @Column()
    apellido_paterno;

    @Column()
    apellido_materno;

    @Column()
    correo;

    @Column()
    telefono;

    @Column()
    dni;

    @Column()
    cargo_actual;

    @Column()
    area_actual;

    @ManyToOne(() => Empresa, (empresa) => empresa.clientes)
    empresa;
}