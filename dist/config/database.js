"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = {
    type: 'mysql',
    host: '124.223.95.29',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'nest_demo',
    entities: [(0, path_1.join)(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: true,
};
//# sourceMappingURL=database.js.map