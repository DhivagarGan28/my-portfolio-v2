import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';

@Component({
     selector: 'app-ai-chat',
     imports: [FormsModule, CommonModule, HttpClientModule],
     templateUrl: './ai-chat.html',
     styleUrl: './ai-chat.css'
})
export class AiChat {
     userMessage = '';
     chatLog: { role: string, content: string }[] = [];

     constructor(private http: HttpClient) {}

     sendMessage() {
          if (!this.userMessage.trim()) return;

          const message = this.userMessage;
          this.chatLog.push({ role: 'User', content: message });
          this.userMessage = '';

          const headers = new HttpHeaders({
               'Content-Type': 'application/json',
               'Authorization': 'Bearer sk-3ded2c76ba2845ff9c49fa811225f997'
          });

          const body = {
                         "messages": [ 
                              { "role": "user", "content": message }
                              ],
                         "model": "deepseek-chat",
                    };

          this.http.post<any>('https://api.deepseek.com/chat/completions', body, { headers }).subscribe(
          (res) => {
               const reply = res.choices?.[0]?.message?.content || 'No response.';
               this.chatLog.push({ role: 'Bot', content: reply });
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
