import { dataSource } from "@/utils/dataSource"; // Importa la configuración del DataSource
import { ClientePrueba } from "@/entities/ClientePrueba"; // Importa la entidad ClientePrueba
import { Cliente } from "@/entities/Cliente"; // Importa la entidad Cliente

export const PATCH = async (request, { params }) => {
    try {
        // Inicializa el DataSource si no está inicializado
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        const clienteRepository = dataSource.getRepository(Cliente);
        const clientePruebaRepository = dataSource.getRepository(ClientePrueba);

        // Busca el cliente por su ID
        const cliente = await clienteRepository.findOne({
            where: { cliente_id: params.id },
        });

        if (!cliente) {
            return new Response("Cliente not found", { status: 404 });
        }

        // Obtén el cuerpo de la solicitud
        const body = await request.json();
        const { prueba_id, status } = body;

        // Actualiza el estado de la prueba
        const existingPrueba = await clientePruebaRepository.findOne({
            where: { cliente_id: params.id, prueba_id },
        });

        if (!existingPrueba) {
            return new Response("Prueba not found for the given cliente", { status: 404 });
        }

        existingPrueba.status = status; // Actualiza el estado
        await clientePruebaRepository.save(existingPrueba); // Guarda los cambios

        // Devuelve la prueba actualizada
        return new Response(JSON.stringify(existingPrueba), { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return new Response("Failed to update task", { status: 500 });
    }
};