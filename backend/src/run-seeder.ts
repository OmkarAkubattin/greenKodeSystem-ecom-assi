import { AppDataSource } from './data-source';
import { InitialSeeder } from './seeder/initial-seeder';

async function runSeeder() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized...');

    const seeder = new InitialSeeder(AppDataSource);
    await seeder.seed();

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeeder();
