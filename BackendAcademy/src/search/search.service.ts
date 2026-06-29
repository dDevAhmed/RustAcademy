import { Injectable } from '@nestjs/common';
import { CourseEntity } from '../courses/course.entity';
import { CourseService } from '../courses/course.service';
import { SearchCoursesQueryDto } from './dto/search-courses-query.dto';

@Injectable()
export class SearchService {
  constructor(private readonly courseService: CourseService) {}

  async searchCourses(query: SearchCoursesQueryDto): Promise<CourseEntity[]> {
    const courses = await this.courseService.findAll();
    const tags = this.normalize([...(query.tag ?? []), ...(query.tags ?? [])]);
    const categories = this.normalize([
      ...(query.category ?? []),
      ...(query.categories ?? []),
    ]);
    const match = query.match ?? 'any';

    if (tags.length === 0 && categories.length === 0) {
      return courses;
    }

    return courses.filter(course => {
      const courseTags = this.normalize(course.tags);
      const courseCategories = this.normalize([
        course.category,
        ...(course.categories ?? []),
      ]);

      const tagMatches = tags.map(tag => courseTags.includes(tag));
      const categoryMatches = categories.map(
        category => courseCategories.includes(category),
      );
      const checks = [...tagMatches, ...categoryMatches];

      return match === 'all'
        ? checks.every(Boolean)
        : checks.some(Boolean);
    });
  }

  private normalize(values?: string[]): string[] {
    return (values ?? [])
      .map(value => value.trim().toLowerCase())
      .filter(Boolean);
  }
}
