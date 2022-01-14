import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from 'src/entites/photo.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;

  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  @Column({ default: 3 })
  role: number;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
