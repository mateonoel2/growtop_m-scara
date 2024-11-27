import { CustomAdapter } from "../../../../lib/custom-adapter"; // Importa el CustomAdapter para trabajar con MySQL

export const GET = async (request, { params }) => {
    try {
        // Obtén una conexión al pool de MySQL
        const pool = CustomAdapter();

        // Realiza la consulta directamente a la base de datos
        const [rows] = await pool.query(
            "SELECT * FROM clientes WHERE cliente_id = ?",
            [params.id]
        );

        // Maneja el caso en que no se encuentre el cliente
        if (rows.length === 0) {
            return new Response("Cliente not found", { status: 404 });
        }

        // Devuelve el cliente como respuesta JSON
        return new Response(JSON.stringify(rows[0]), { status: 200 });
    } catch (error) {
        console.error("Error fetching cliente:", error);
        return new Response("Failed to fetch cliente", { status: 500 });
    }
};