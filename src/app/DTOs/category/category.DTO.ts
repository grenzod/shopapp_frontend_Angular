import { 
    IsNotEmpty, 
    IsString 
} from "class-validator";

export class CategoryDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    constructor(data: any) {
        this.name = data.name;
    }
}