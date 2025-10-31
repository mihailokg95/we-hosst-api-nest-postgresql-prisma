import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { IsMineGuard } from 'src/auth/guards/is-mine.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1, // Set default page to 1
    @Query('limit') limit = 10, // Set default limit to 10
    @Query('odrderBy')
    orderBy: { updatedAt: Prisma.SortOrder } = {
      updatedAt: 'asc' as Prisma.SortOrder,
    }, // Set default limit to 10
  ) {
    return this.usersService.findAll({ page, limit, orderBy });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.getUserById(+id);
  }

  @Patch(':id')
  @UseGuards(IsMineGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ id, updateUserDto });
  }

  @Delete(':id')
  @UseGuards(IsMineGuard)
  remove(@Param('id') id: string, res: Response) {
    res.clearCookie('jwt-token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    // Clear cookies
    res.clearCookie('jwt-token-refresh', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return this.usersService.deleteUser(+id);
  }

  @Get('bookmarked-jobs')
  async getBookmarkedJobs(req: Request) {
    // TODO: replace with auth user extraction
    const user = await this.usersService.findAll({ page: 1, limit: 1 });
    const firstId = (user.data?.[0] as any)?.id ?? 1;
    return this.usersService.getBookmarkedJobs(firstId);
  }

  @Post('jobs/:jobId/bookmark')
  async bookmarkJob(@Param('jobId') jobId: string) {
    const users = await this.usersService.findAll({ page: 1, limit: 1 });
    const firstId = (users.data?.[0] as any)?.id ?? 1;
    return this.usersService.bookmarkJob(firstId, +jobId);
  }

  @Get('applications')
  async getApplications() {
    const users = await this.usersService.findAll({ page: 1, limit: 1 });
    const firstId = (users.data?.[0] as any)?.id ?? 1;
    return this.usersService.getApplications(firstId);
  }

  @Post('jobs/:jobId/apply')
  async applyJob(
    @Param('jobId') jobId: string,
    @Body() body: { resume: string; coverLetter: string },
  ) {
    const users = await this.usersService.findAll({ page: 1, limit: 1 });
    const firstId = (users.data?.[0] as any)?.id ?? 1;
    return this.usersService.applyToJob(firstId, +jobId, body);
  }
}
