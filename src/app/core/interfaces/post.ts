import { IRecipe } from "./recipe";
import { IUser } from "./user";

export interface IPost {
    text: string;
    likes: string[];
    dislikes: string[];
    userId: IUser;
    recipeId: IRecipe;
    created_at: string;
    updatedAt: string;
    _id: string;
    __v: number;
}