import { openDB } from '@/utils/sqlite';

export const GET = async (request, { params }) => {
    try {
        const db = await openDB();
        const empresa = await db.get('SELECT * FROM empresas WHERE empresa_id = ?', [params.id]);

        if (!empresa) {
            return new Response("Empresa not found", { status: 404 });
        }

        return new Response(JSON.stringify(empresa), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch empresa", { status: 500 });
    }
};