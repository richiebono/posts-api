import { Users } from "./users.dto"

export class Posts {
    id: number;
    userId: number;
    title: string;
    body: string;
    user: Users;
    comments: [
        { 
            postId: number,
            id: number,
            name: string,
            email: string,
            body: string
        }];
}
