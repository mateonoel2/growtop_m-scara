import { prisma } from "@/utils/prisma";

export const GET = async (request, { params }) => {
    try {
        // Realizar la consulta para obtener la información del cliente
        const cliente = await prisma.clientes.findUnique({
            where: {
                cliente_id: parseInt(params.id),
            },
        });

        if (!cliente) {
            return new Response("Cliente not found", { status: 404 });
        }

        return new Response(JSON.stringify(cliente), { status: 200 });
    } catch (error) {
        console.error("Error fetching cliente:", error);
        return new Response("Failed to fetch cliente", { status: 500 });
    }
};