import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from 'src/photos/photo.entity';
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

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
