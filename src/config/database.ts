import { join } from 'path';

export default {
  type: 'mysql',
  host: '124.223.95.29',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'nest_demo',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
