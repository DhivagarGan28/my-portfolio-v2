import { Component } from '@angular/core';
import { Home } from '../home/home';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  imports: [],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work {
  currentYear: number = new Date().getFullYear();
constructor(public router:Router){}
  Home(){
      this.router.navigate(['/']);
    }
    about(){
      this.router.navigate(['/about']);
    }
    mywor(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  isMenuOpen = false;

    toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
    this.isMenuOpen = false;
    }
}
