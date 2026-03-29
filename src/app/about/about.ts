import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  currentYear: number = new Date().getFullYear();
    constructor(public router:Router){}
  mywor(){
      this.router.navigate(['/work']);
  }
  Home(){
      this.router.navigate(['/']);
  }
  about(){
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
