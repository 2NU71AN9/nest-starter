import { SetMetadata } from '@nestjs/common';

export const NoAuth = () => SetMetadata('no-auth', true);
export const Role = (role: number) => SetMetadata('role', role);
