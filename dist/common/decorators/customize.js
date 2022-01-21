"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.NoAuth = void 0;
const common_1 = require("@nestjs/common");
const NoAuth = () => (0, common_1.SetMetadata)('no-auth', true);
exports.NoAuth = NoAuth;
const Role = (role) => (0, common_1.SetMetadata)('role', role);
exports.Role = Role;
//# sourceMappingURL=customize.js.map