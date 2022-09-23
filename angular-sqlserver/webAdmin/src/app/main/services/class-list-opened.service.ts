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
  id_list: number[] = [];

  add_class_section(section: ClassSection): void {
    if (!this.id_list.includes(section.id)) {
      this.class_list_opened.unshift(section);
      this.id_list.unshift(section.id);
    }
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
