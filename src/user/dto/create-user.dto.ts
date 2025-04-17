import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    role: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 200)
    full_name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    efficiency: number
}
