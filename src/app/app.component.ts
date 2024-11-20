import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopicsComponent } from './components/body/topics/topics.component';
import { HomeComponent } from './components/body/home/home.component';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import topics_json from '../assets/topics.json';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    SideBarComponent,
    TopicsComponent,
    HomeComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, left: '-100px' })),
      transition(':enter', [
        group([
          animate('300ms cubic-bezier(0.215, 0.61, 0.355, 1)', style({ opacity: 1 })),
          animate('300ms cubic-bezier(0.215, 0.61, 0.355, 1)', style({ left: 0 }))
        ]),
      ]),
      transition(':leave', [
        group([
          animate('300ms cubic-bezier(0.55, 0.055, 0.675, 0.19)', style({ opacity: 0 })),
          animate('300ms cubic-bezier(0.55, 0.055, 0.675, 0.19)', style({ left: '-100px' }))
        ]),
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Maher Saleh - Portfolio';
  selected_topic: string = 'Home';
  topics_visible = false;
  animationState = false;

  topics: any = topics_json;

  selected_topic_change(value: string){
    this.topics_visible = false;
      this.selected_topic = value;
    setTimeout(()=>{
      this.topics_visible = true;
    }, 300);
    this.animationState = !this.animationState;
  }

}