import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function setupDiscordRoles() {
  try {
    console.log('🚀 Richte Discord-Rollen-Mappings ein...');

    // Discord-Rollen-Mappings (13 Ränge + Basis-Rolle + Funktionsrollen + Legacy)
    const roleMappings = [
      // Basis-Rolle "Reyes del Fuego" - Familienzugehörigkeit (Anwärter / Lese-Zugriff)
      {
        discordRoleId: '1514604027256635467',
        systemRole: Role.FUTURO,
        name: 'Reyes del Fuego',
        isActive: true,
      },
      // Leaderschaft
      {
        discordRoleId: '1514604027281674299', // 👑 - La Patrona (Discord-Rolle ggf. noch "El Patrón")
        systemRole: Role.EL_PATRON,
        name: 'La Patrona',
        isActive: true,
      },
      {
        discordRoleId: '1514604027281674298', // 🔥 - Don (El Capitán)
        systemRole: Role.DON_CAPITAN,
        name: 'Don - El Capitán',
        isActive: true,
      },
      {
        discordRoleId: '1514604027281674297', // 🛡️ - Don (El Comandante)
        systemRole: Role.DON_COMANDANTE,
        name: 'Don - El Comandante',
        isActive: true,
      },
      {
        discordRoleId: '1514604027281674296', // 🤝 - El Mano Derecha
        systemRole: Role.EL_MANO_DERECHA,
        name: 'El Mano Derecha',
        isActive: true,
      },
      // Ränge 7-9
      {
        discordRoleId: '1514604027281674294', // 🔒 - 9 | El Custodio
        systemRole: Role.EL_CUSTODIO,
        name: '9 | El Custodio',
        isActive: true,
      },
      {
        discordRoleId: '1514604027281674293', // 📚 - 8 | El Mentor
        systemRole: Role.EL_MENTOR,
        name: '8 | El Mentor',
        isActive: true,
      },
      {
        discordRoleId: '1514604027273416796', // 🧰 - 7 | El Encargado
        systemRole: Role.EL_ENCARGADO,
        name: '7 | El Encargado',
        isActive: true,
      },
      // Ränge 4-6
      {
        discordRoleId: '1514604027273416795', // ⭐ - 6 | El Teniente
        systemRole: Role.EL_TENIENTE,
        name: '6 | El Teniente',
        isActive: true,
      },
      {
        discordRoleId: '1514604027273416794', // ⚔️ - 5 | Soldado
        systemRole: Role.SOLDADO,
        name: '5 | Soldado',
        isActive: true,
      },
      {
        discordRoleId: '1514604027273416793', // 🐍 - 4 | El Prefecto
        systemRole: Role.EL_PREFECTO,
        name: '4 | El Prefecto',
        isActive: true,
      },
      // Ränge 1-3
      {
        discordRoleId: '1514604027273416792', // 🫢 - 3 | El Confidente
        systemRole: Role.EL_CONFIDENTE,
        name: '3 | El Confidente',
        isActive: true,
      },
      {
        discordRoleId: '1514604027273416791', // 🐢 - 2 | El Protector
        systemRole: Role.EL_PROTECTOR,
        name: '2 | El Protector',
        isActive: true,
      },
      {
        discordRoleId: '1514604027273416790', // 🌱 - 1 | El Novato
        systemRole: Role.EL_NOVATO,
        name: '1 | El Novato',
        isActive: true,
      },
      // Funktionsrollen
      {
        discordRoleId: '1514604027273416787', // Routenverwaltung
        systemRole: Role.ROUTENVERWALTUNG,
        name: 'Routenverwaltung',
        isActive: true,
      },
      {
        discordRoleId: '1514604027265155198', // Sicario
        systemRole: Role.SICARIO,
        name: 'Sicario',
        isActive: true,
      },
      // Legacy: Inspector existiert auf dem aktuellen Discord-Server nicht mehr,
      // bleibt als inaktives Mapping für historische Daten erhalten.
      {
        discordRoleId: '1431388062474309697', // Inspector (Legacy)
        systemRole: Role.ROUTENVERWALTUNG,
        name: 'Inspector',
        isActive: false,
      },
    ];

    for (const mapping of roleMappings) {
      const existing = await prisma.discordRoleMapping.findUnique({
        where: { discordRoleId: mapping.discordRoleId }
      });

      if (existing) {
        await prisma.discordRoleMapping.update({
          where: { discordRoleId: mapping.discordRoleId },
          data: {
            systemRole: mapping.systemRole,
            name: mapping.name,
            isActive: mapping.isActive,
          }
        });
        console.log(`✅ Mapping aktualisiert: ${mapping.name} (${mapping.discordRoleId}) -> ${mapping.systemRole}${mapping.isActive ? '' : ' [inaktiv]'}`);
      } else {
        await prisma.discordRoleMapping.create({
          data: {
            discordRoleId: mapping.discordRoleId,
            systemRole: mapping.systemRole,
            name: mapping.name,
            isActive: mapping.isActive,
          }
        });
        console.log(`✅ Mapping erstellt: ${mapping.name} (${mapping.discordRoleId}) -> ${mapping.systemRole}${mapping.isActive ? '' : ' [inaktiv]'}`);
      }
    }

    console.log('🎉 Discord-Rollen-Mappings erfolgreich eingerichtet!');

    const allMappings = await prisma.discordRoleMapping.findMany({
      orderBy: {
        systemRole: 'asc'
      }
    });

    console.log('\n📋 Aktuelle Discord-Rollen-Mappings:');
    allMappings.forEach(mapping => {
      console.log(`  • ${mapping.name} (${mapping.discordRoleId}) -> ${mapping.systemRole}${mapping.isActive ? '' : ' [inaktiv]'}`);
    });

    console.log('\n🔒 Nur Benutzer mit diesen Discord-Rollen können sich anmelden!');

  } catch (error) {
    console.error('❌ Fehler beim Einrichten der Discord-Rollen:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDiscordRoles();
