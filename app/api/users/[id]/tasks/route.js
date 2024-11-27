import { CustomAdapter } from "../../../../lib/custom-adapter"; // Importa el CustomAdapter para trabajar con MySQL

export const PATCH = async (request, { params }) => {
    try {
        // Obtén el pool de conexión desde CustomAdapter
        const pool = CustomAdapter();

        // Verifica si el cliente existe
        const [clienteRows] = await pool.query(
            "SELECT * FROM clientes WHERE cliente_id = ?",
            [params.id]
        );

        if (clienteRows.length === 0) {
            return new Response("Cliente not found", { status: 404 });
        }

        // Obtén los datos de la solicitud
        const body = await request.json();
        const { prueba_id, status } = body;

        // Verifica si la prueba asociada al cliente existe
        const [pruebaRows] = await pool.query(
            "SELECT * FROM cliente_pruebas WHERE cliente_id = ? AND prueba_id = ?",
            [params.id, prueba_id]
        );

        if (pruebaRows.length === 0) {
            return new Response("Prueba not found for the given cliente", { status: 404 });
        }

        // Actualiza el estado de la prueba
        await pool.query(
            "UPDATE cliente_pruebas SET status = ? WHERE cliente_id = ? AND prueba_id = ?",
            [status, params.id, prueba_id]
        );

        // Recupera la prueba actualizada
        const [updatedPruebaRows] = await pool.query(
            "SELECT * FROM cliente_pruebas WHERE cliente_id = ? AND prueba_id = ?",
            [params.id, prueba_id]
        );

        // Devuelve la prueba actualizada como respuesta
        return new Response(JSON.stringify(updatedPruebaRows[0]), { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return new Response("Failed to update task", { status: 500 });
    }
};