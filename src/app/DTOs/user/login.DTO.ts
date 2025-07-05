import{
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsEmail
} from 'class-validator'

export class LoginDTO{
    @IsPhoneNumber()
    phone_number: string;

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(data: any){
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.password = data.password;
    }
}