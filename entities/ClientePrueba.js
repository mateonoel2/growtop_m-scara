import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Cliente } from "./Cliente";

@Entity("cliente_pruebas") // Nombre de la tabla en la base de datos
export class ClientePrueba {
    @PrimaryColumn()
    cliente_id;

    @PrimaryColumn()
    prueba_id;

    @Column({ nullable: true }) // Marca como nullable si es opcional
    status;

    @Column()
    inicio_assessment;

    @Column()
    fin_assessment;

    @ManyToOne(() => Cliente, (cliente) => cliente.pruebas)
    cliente;
}