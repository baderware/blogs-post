import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export enum PostType {
  TEXT = 'text',
  PHOTO = 'photo',
  VIDEO = 'video',
}
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

//for SEO
  @Column({ nullable: true })
  slug: string;

  @Column()
  title:string;

  @Column({type:'text', nullable:true})
  content:string

  @Column({nullable:true})
  mediaURL: string;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.TEXT,
  })
  type: PostType;
//-----------------------------------------------------
  //creates a column containing the ID of 
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
//-----------------------------------------------------
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
