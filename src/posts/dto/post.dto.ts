import { Comments } from "./comments.dto";
import { Users } from "./users.dto"

export class Posts {
    id: number;
    userId: number;
    title: string;
    body: string;
}
