import { prisma } from "@/utils/prisma";

export const PATCH = async (request, { params }) => {
    try {
        // Obtener la información del cliente por ID
        const cliente = await prisma.clientes.findUnique({
            where: {
                cliente_id: parseInt(params.id),
            },
        });

        if (!cliente) {
            return new Response("Cliente not found", { status: 404 });
        }

        // Parseamos links_status para modificarlo. Asumimos que está almacenado como JSON.
        let links_status = JSON.parse(cliente.links_status);

        // Leer el cuerpo de la solicitud para obtener el índice a actualizar
        const body = await request.json();
        const { id } = body;

        // Actualizar el estado del link en el índice especificado
        links_status[id] = links_status[id] === "completed" ? "pending" : "completed";

        // Guardar el estado actualizado en la base de datos
        const updatedCliente = await prisma.clientes.update({
            where: {
                cliente_id: parseInt(params.id),
            },
            data: {
                links_status: JSON.stringify(links_status),
            },
        });

        return new Response(JSON.stringify(updatedCliente), { status: 200 });
    } catch (error) {
        console.error("Error updating cliente:", error);
        return new Response("Failed to update cliente", { status: 500 });
    }
};