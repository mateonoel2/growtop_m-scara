import { openDB } from '@/utils/sqlite';

export const PATCH = async (request, { params }) => {
    try {
        const db = await openDB();
        const cliente = await db.get('SELECT * FROM clientes WHERE cliente_id = ?', [params.id]);

        if (!cliente) {
            return new Response("Cliente not found", { status: 404 });
        }

        const body = await request.json();
        const { prueba_id, status } = body;

        // Actualizar el estado de la prueba en cliente_pruebas
        await db.run(
            'UPDATE cliente_pruebas SET status = ? WHERE cliente_id = ? AND prueba_id = ?',
            [status, params.id, prueba_id]
        );

        const updatedTask = await db.get(
            'SELECT * FROM cliente_pruebas WHERE cliente_id = ? AND prueba_id = ?',
            [params.id, prueba_id]
        );

        return new Response(JSON.stringify(updatedTask), { status: 200 });
    } catch (error) {
        return new Response("Failed to update task", { status: 500 });
    }
};