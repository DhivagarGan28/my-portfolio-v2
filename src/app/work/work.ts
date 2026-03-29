import { Component, Renderer2 } from '@angular/core';
import { Home } from '../home/home';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work {
  currentYear: number = new Date().getFullYear();
constructor(public router:Router, private renderer: Renderer2){}
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

    modalClass: string = '';
    openModal(id: string) {
      this.modalClass = id;

      // add class to body
      this.renderer.addClass(document.body, 'modal-active');
    }

    closeModal() {
      this.modalClass = 'out';

      // remove class from body
      this.renderer.removeClass(document.body, 'modal-active');
    }
}
