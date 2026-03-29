import { Component, AfterViewInit, ElementRef, ViewChildren , QueryList, ViewChild, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate} from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';

@Component({
     selector: 'app-home',
     standalone: true,
     imports: [MatTooltipModule, FormsModule],
     templateUrl: './home.html',
     styleUrl: './home.css',
     animations: [
          trigger('fadeIn', [
               transition(':enter', [
               style({ opacity: 0 }),
               animate('1s ease-in', style({ opacity: 1 }))
               ])
          ]),
          trigger('fadeSlideIn', [
               transition(':enter', [
               style({ opacity: 0, transform: 'translateY(30px)' }),
               animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
               ]),
               transition(':leave', [
               animate('600ms ease-in', style({ opacity: 0, transform: 'translateY(30px)' }))
               ])
          ])
     ]

})
export class Home implements AfterViewInit{
     @ViewChild('box1') box1!: ElementRef;
     @ViewChild('box2') box2!: ElementRef;

  showBox1: boolean = false;
  showBox2: boolean = false;

     ngAfterViewInit() {
     const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
          if (entry.isIntersecting) {
               if (entry.target === this.box1.nativeElement) this.showBox1 = true;
               if (entry.target === this.box2.nativeElement) this.showBox2 = true;
               obs.unobserve(entry.target);
          }
          });
     }, { threshold: 0.2 });

     observer.observe(this.box1.nativeElement);
     observer.observe(this.box2.nativeElement);
     }
     show = true;
     toggle() { this.show = !this.show; }

     currentYear: number = new Date().getFullYear();
     constructor(public router:Router, public render:Renderer2){}
     mywor(){
          this.router.navigate(['/work']);
     }
     about(){
          this.router.navigate(['/about']);
     }

     Home(){
          window.scrollTo({ top: 0, behavior: 'smooth' });
     }  
     isMenuOpen = false;

     toggleMenu() {
     this.isMenuOpen = !this.isMenuOpen;
     }

     closeMenu() {
          this.isMenuOpen = false;
     }
          name = '';
          email = '';
          message = '';

          sendEmail() {
          const templateParams = {
               from_name: this.name,
               from_email: this.email,
               message: this.message
          };

          emailjs.send(
               'service_1tc3znk',   // from EmailJS
               'template_kbl7uih',
               templateParams,
               'ZyYMc7GK6jIeQZ99D'
          ).then(
               () => {
               alert('Message sent successfully!');
               },
               (error) => {
               console.log(error);
               alert('Failed to send message');
               }
          );
     }
}
