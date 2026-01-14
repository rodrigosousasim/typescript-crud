import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 1, description: 'ID do autor (vid) vindo da tabela de usuários' })
  @IsNumber()
  @IsNotEmpty()
  author_vid: number;

  @ApiProperty({ example: 'Como configurar o Prisma 7', description: 'Título do post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Conteúdo detalhado sobre o Prisma...', description: 'Corpo do texto' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: ['typescript', 'node'], description: 'Tags do post' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ default: true, description: 'Define se o post é público' })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}