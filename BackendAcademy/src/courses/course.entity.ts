import { CourseLevel } from './interfaces/course-level.enum';

export class CourseEntity {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  order: number;
  learningPathId: string;
  duration: number;
  category: string;
  categories: string[];
  tags: string[];
  prerequisites: string[];
  skills: string[];
  xpReward: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CourseEntity>) {
    Object.assign(this, partial);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();
    this.isActive = this.isActive ?? true;
    this.category = this.category || this.categories?.[0] || 'general';
    this.categories = this.categories || [this.category];
    this.tags = this.tags || [];
    this.prerequisites = this.prerequisites || [];
    this.skills = this.skills || [];
  }
}
