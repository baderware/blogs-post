import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @Column()
    content: string;
    
    //-------------------------------------------------
    @ManyToOne(() => User, (author) => author.comments)
    author: User;
    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
    //---------------------------------------------------
}
