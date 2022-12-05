import { IUser } from "./user";

export interface IRecipe {
    recipeName: string;
    description: string;
    ingredients: string;
    saves: string[];
    posts: string[];
    created_at: string;
    updated_at: string;
    userId: IUser;
}