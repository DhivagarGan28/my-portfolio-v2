import { Routes } from '@angular/router';
import { Work } from './work/work';
import { Home } from './home/home';
import { About } from './about/about';
import { AiChat } from './ai-chat/ai-chat';
export const routes: Routes = [
     {path :'', component: Home},
     {path :'work', component: Work},
     {path :'about', component: About},
     {path :'aichat', component: AiChat},
];
