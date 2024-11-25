import { dataSource } from "@/utils/dataSource"; // Importa la configuración de tu DataSource
import { Cliente } from "@/entities/Cliente"; // Importa la entidad Cliente

export const GET = async (request, { params }) => {
    try {
        // Asegúrate de inicializar el DataSource si no está inicializado
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        // Obtén el repositorio de la entidad Cliente
        const clienteRepository = dataSource.getRepository(Cliente);

        // Busca el cliente por su ID
        const cliente = await clienteRepository.findOne({
            where: { cliente_id: params.id }, // Asegúrate de que el campo coincida con la entidad
        });

        // Maneja el caso en que no se encuentre el cliente
        if (!cliente) {
            return new Response("Cliente not found", { status: 404 });
        }

        // Devuelve el cliente como respuesta JSON
        return new Response(JSON.stringify(cliente), { status: 200 });
    } catch (error) {
        console.error("Error fetching cliente:", error);
        return new Response("Failed to fetch cliente", { status: 500 });
    }
};