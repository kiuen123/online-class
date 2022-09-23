import { Injectable } from '@angular/core';

export interface UserSection {
  id: number;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserListOpenedService {
  constructor() {}

  user_list_opened: UserSection[] = [];
  id_list: number[] = [];
  add_user_section(section: UserSection): void {
    if (!this.id_list.includes(section.id)) {
      this.user_list_opened.unshift(section);
      this.id_list.unshift(section.id);
    }
  }

  get_user_section(): UserSection[] {
    return this.user_list_opened;
  }

  close_user_section(id: number): void {
    this.user_list_opened = this.user_list_opened.filter(
      (section) => section.id !== id
    );
  }
}
