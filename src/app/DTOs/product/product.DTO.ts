import{
    IsString,
    IsNotEmpty,
    Min,
    MAX,
} from 'class-validator'
export class ProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Min(0)
    price: number;

    thumbnail: string;
    description: string;
    category_id: number;

    constructor(data: any) {
        this.name = data.name;
        this.price = data.price;
        this.thumbnail = data.thumbnail;
        this.description = data.description;
        this.category_id = data.category_id;
    }
}