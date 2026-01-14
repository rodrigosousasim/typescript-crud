import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Testa conexão
    await prisma.$connect();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');

    // Opcional: testar se consegue listar tabelas (exemplo com User)
    const users = await prisma.user.findMany();
    console.log('Usuários existentes:', users);
  } catch (error) {
    console.error('❌ Erro ao conectar no MySQL:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
