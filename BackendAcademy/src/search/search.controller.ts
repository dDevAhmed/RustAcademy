import { Controller, Get, Query } from '@nestjs/common';
import { SearchCoursesQueryDto } from './dto/search-courses-query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('courses')
  async searchCourses(@Query() query: SearchCoursesQueryDto) {
    return this.searchService.searchCourses(query);
  }
}
