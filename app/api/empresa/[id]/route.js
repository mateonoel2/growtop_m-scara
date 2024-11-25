import { getDataSource } from "@/utils/dataSource"; // Asegúrate de tener configurado el DataSource de TypeORM
import { Empresa } from "@/entities/Empresa"; // Importa la entidad Empresa

export const GET = async (request, { params }) => {
    try {
        // Obtén el DataSource
        const dataSource = await getDataSource();

        // Obtén el repositorio de la entidad Empresa
        const empresaRepository = dataSource.getRepository(Empresa);

        // Busca la empresa por ID
        const empresa = await empresaRepository.findOne({
            where: { empresa_id: params.id }, // Ajusta según tu columna en la entidad
        });

        // Si no se encuentra, devuelve un 404
        if (!empresa) {
            return new Response("Empresa not found", { status: 404 });
        }

        // Devuelve la empresa encontrada
        return new Response(JSON.stringify(empresa), { status: 200 });
    } catch (error) {
        console.error("Error al obtener la empresa:", error);
        return new Response("Failed to fetch empresa", { status: 500 });
    }
};