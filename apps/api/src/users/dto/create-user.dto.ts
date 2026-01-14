import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsInt, IsArray, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 1234, description: 'ID de identificação manual (vid)' })
  @IsInt()
  vid: number;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: ['admin'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}