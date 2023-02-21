import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProjectDto, ProjectUpdateDto } from './dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProjectDto) {
    // save the project to database
    const project = await this.prisma.project.create({
      data: {
        title: dto.title,
      },
    });

    return project;
  }

  async findById(id: number) {
    // find the project by id
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('There is no project with this id');
    }

    console.log('Successfully fetched project with id: ', id);
    return project;
  }

  async findAll() {
    // find all projects
    const projects = await this.prisma.project.findMany();

    console.log('Successfully fetched all projects');
    return projects;
  }

  async update(id: number, updatedField: ProjectUpdateDto) {
    // save the project to database
    const project = await this.prisma.project.update({
      where: {
        id,
      },
      data: updatedField,
    });

    console.log('Successfully updated project with id: ', id);
    return project;
  }

  async removeById(id: number) {
    // remove project by id
    try {
      const project = await this.prisma.project.delete({
        where: {
          id,
        },
      });

      console.log('Successfully removed project with id: ', id);
      return project;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Project to remove does not exist.');
        }
      }
      throw error;
    }
  }
}
