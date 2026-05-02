import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum UserRole {
  MODERATOR = 'MODERATOR',
  USER = 'USER',
  ADMIN = 'ADMIN',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({nullable:false})
   password:string;
  @Column({ unique: true })
  email: string;

  @Column({type: 'enum', enum:UserRole, default:UserRole.USER})
  role: UserRole;


  @OneToMany(()=> Post, (post) => post.user )
  posts: Post[];

    //One user has many comments
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
