import { IUser } from "./user";
 
export interface IRecipe {
    recipeName: string;
    description: string;
    ingredients: string;
    imgUrl: string;
    saves: string[];
    likes: string[];
    userId: IUser;
    _id: string;
    __v: number;
}