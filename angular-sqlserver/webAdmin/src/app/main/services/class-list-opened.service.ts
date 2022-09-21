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

  add_class_section(section: ClassSection): void {
    this.class_list_opened.unshift(section);
  }

  get_class_section(): ClassSection[] {
    return this.class_list_opened;
  }

  close_class_section(id: number): void {
    this.class_list_opened = this.class_list_opened.filter(
      (section) => section.id !== id
    );
  }
}
