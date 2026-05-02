import { IsString } from "class-validator";
import { PostType } from "../entities/post.entity";

export class CreatePostDto {
 @IsString()
  content: string;

  @IsString()
  title: string;

}
