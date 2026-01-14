import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author_vid: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}