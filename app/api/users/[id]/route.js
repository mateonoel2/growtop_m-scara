import { openDB } from '@/utils/sqlite';

export const GET = async (request, { params }) => {
    try {
        const db = await openDB();
        const cliente = await db.get('SELECT * FROM clientes WHERE cliente_id = ?', [params.id]);

        if (!cliente) {
            return new Response("Cliente not found", { status: 404 });
        }

        return new Response(JSON.stringify(cliente), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch cliente", { status: 500 });
    }
};