import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是String' })
  readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是String' })
  readonly password: string;

  @IsNumber({}, { message: '年龄必须是数字' })
  readonly age: number;
}
