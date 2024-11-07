import { prisma } from "@/utils/prisma";

export const GET = async (request, { params }) => {
    try {
        const empresa = await prisma.empresas.findUnique({
            where: {
                empresa_id: parseInt(params.id),
            },
        });

        if (!empresa) {
            return new Response("Empresa not found", { status: 404 });
        }

        return new Response(JSON.stringify(empresa), { status: 200 });
    } catch (error) {
        console.error("Error fetching empresa:", error);
        return new Response("Failed to fetch empresa", { status: 500 });
    }
};