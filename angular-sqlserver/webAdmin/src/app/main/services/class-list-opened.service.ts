import { Injectable } from '@angular/core';

export interface ClassSection {
  id: number;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassListOpenedService {
  constructor() {}
  class_list_opened: ClassSection[] = [];
  length: number = 0;

  add_class_section(section: ClassSection): void {
    this.class_list_opened.unshift(section);
    this.class_list_opened_length();
  }

  get_class_section(): ClassSection[] {
    this.class_list_opened_length();
    return this.class_list_opened;
  }

  close_class_section(id: number): void {
    this.class_list_opened = this.class_list_opened.filter(
      (section) => section.id !== id
    );
    this.class_list_opened_length();
  }

  class_list_opened_length(): void {
    this.length = this.class_list_opened.length;
  }

  get_class_list_opened_length(): number {
    return this.length;
  }
}
