import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo post' })
  @ApiResponse({ status: HttpStatus.CREATED, type: PostResponseDto })
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os posts' })
  @ApiResponse({ status: HttpStatus.OK, type: [PostResponseDto] })
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um post pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, type: PostResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um post existente' })
  @ApiResponse({ status: HttpStatus.OK, type: PostResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um post' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Post removido com sucesso' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}