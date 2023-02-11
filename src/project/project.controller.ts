import { ProjectDto, ProjectUpdateDto } from './dto/project.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  create(@Body() dto: ProjectDto) {
    return this.projectService.create(dto);
  }

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id) {
    return this.projectService.findById(id);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: ProjectUpdateDto,
  ) {
    return this.projectService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.projectService.removeById(id);
  }
}
