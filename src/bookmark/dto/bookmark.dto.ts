import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookmarkDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsNotEmpty()
    @IsString()
    link: string
}

export class EditBookmarkDto {
    @IsString()
    @IsOptional()
    title?: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsNotEmpty()
    @IsOptional()
    link?: string
}