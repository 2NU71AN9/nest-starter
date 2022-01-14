import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是String' })
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是String' })
  readonly password: string;
}
