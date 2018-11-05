import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  getLoginUrl(): string {
    return '/login';
  }
}
