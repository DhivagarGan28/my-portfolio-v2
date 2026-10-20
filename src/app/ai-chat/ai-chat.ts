import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
     selector: 'app-ai-chat',
     imports: [FormsModule, CommonModule, HttpClientModule],
     templateUrl: './ai-chat.html',
     styleUrl: './ai-chat.css'
})
export class AiChat {
     userMessage = '';
     reply = ''
     chatLog: { role: string, content: string }[] = [];

     constructor(private http: HttpClient, public router:Router) {}
     home(){
          this.router.navigate(['/']);
     }
     sendMessage() {
          if (!this.userMessage.trim()) return;

          const message = this.userMessage;
          this.chatLog.push({ role: 'User', content: message });
          this.userMessage = '';

          this.http.post<any>('https://vibe-b-backend.vercel.app/aichatbot', { message: message }).subscribe(
          (res) => {
               if(res.success == true){
                    let result = res.result;
                    if(result[1].status == 'completed' && result[1].content[0].type == 'output_text'){
                         this.reply = result[1].content[0].text;
                    }else{
                         this.reply = 'No response!';
                    }
                    this.chatLog.push({ role: 'Bot', content: this.reply });
               }else{
                    this.chatLog.push({ role: 'Bot', content: 'Error: Could not get response.' });    
               }
          },
          (err) => {
               this.chatLog.push({ role: 'Bot', content: 'Error: Could not get response.' });
          }
          );
     }
     @ViewChild('chatBody') chatBody!: ElementRef;

     ngAfterViewChecked() {
          this.scrollToBottom();
     }

     scrollToBottom() {
          try {
               this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
          } catch (err) {

          }
     }
}
