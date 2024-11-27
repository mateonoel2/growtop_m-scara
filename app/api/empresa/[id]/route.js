import { CustomAdapter } from "../../../../lib/custom-adapter"; // Importa el CustomAdapter para trabajar con MySQL

export const GET = async (request, { params }) => {
    try {
        // Obtén una conexión al pool de MySQL
        const pool = CustomAdapter();

        // Realiza la consulta directamente a la base de datos
        const [rows] = await pool.query(
            "SELECT * FROM empresas WHERE empresa_id = ?",
            [params.id]
        );

        // Si no se encuentra la empresa, devuelve un 404
        if (rows.length === 0) {
            return new Response("Empresa not found", { status: 404 });
        }

        // Devuelve la empresa encontrada
        return new Response(JSON.stringify(rows[0]), { status: 200 });
    } catch (error) {
        console.error("Error al obtener la empresa:", error);
        return new Response("Failed to fetch empresa", { status: 500 });
    }
};