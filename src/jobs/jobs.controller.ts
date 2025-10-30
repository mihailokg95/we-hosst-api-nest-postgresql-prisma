import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { overview } from 'src/applications/overview';
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    const options = { page, perPage };
    return this.jobsService.findAll({page, perPage});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }

  @Get('employer/:id')
  getEmployerJobs(@Param('id') id: number) {
    return this.jobsService.getEmployerJobs(id);
  }

  @Get('employer/:id/applications')
  getEmployerJobsApplications(@Param('id') id: number) {
    return this.jobsService.getApplicationsForAllJobs(id);
  }

  @Get('/applications/overview')
  getApplicationsOverview(@Param('id') id: number) {
    console.log(id);
    return overview;
    // return this.jobsService.getApplicationsOverview();
  }
}
