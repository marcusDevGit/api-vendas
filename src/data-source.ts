import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker_postgres',
  database: 'api-vendas',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  subscribers: [],
});

// Inicialize o DataSource
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source inicializado com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao inicializar o Data Source', err);
  });
