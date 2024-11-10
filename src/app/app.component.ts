import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopicsComponent } from './components/body/topics/topics.component';
import { HomeComponent } from './components/body/home/home.component';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    TopicsComponent,
    HomeComponent
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
  selected_topic: string = '';
  topics_visible = false;
  // topics: any[] = [];
  // topics: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void{
    this.http.get('topics.txt', { responseType: 'text' })
      .subscribe({
        next: (data: string) => {
          this.topics = JSON.parse(data);
          console.log(data);  // Log the content of the file
        },
        error: (err: any) => {
          console.error('Error loading file:', err);
        }
      });
  }

  selected_topic_change(value: string){
    this.topics_visible = false;
      this.selected_topic = value;
    setTimeout(()=>{
      console.log('body_visible' + this.topics_visible);
      this.topics_visible = true;
      console.log('body_visible' + this.topics_visible);
    }, 300);
  }

  topics: any[] = [
            {
              icon: `
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22" viewBox="0 0 640 512">
                  <!--!Font Awesome Free 6.6.0 by @fontawesome - https: //fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                  <path fill="white" d="M64 96c0-35.3 28.7-64 64-64l384 0c35.3 0 64 28.7 64 64l0 256-64 0 0-256L128 96l0 256-64 0L64 96zM0 403.2C0 392.6 8.6 384 19.2 384l601.6 0c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8L76.8 480C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
                </svg>
              `,
              name:'Frontend',
              components: [
                    {
                  item: 'Angular',
                  image: './logos/Frontend/angular.png',
                  snippet: `
                    <p>
                      With over 10 years of experience as a full-stack developer, I've worked extensively with Angular to build dynamic, 
                      responsive web applications that prioritize performance and user experience. My expertise spans from developing 
                      small-scale applications to architecting complex, enterprise-level systems, utilizing Angular's powerful tools 
                      and best practices for high-quality front-end development.
                    </p>
                    <b>Notable Angular Projects:</b>
                  `
                    },
                    {
                  item: 'Vue.js',
                  image: './logos/Frontend/vue-js.png'
                    },
                    {
                  item: 'React',
                  image: './logos/Frontend/react.png'
                    }
                ]
            },
            {
              icon: `
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22" viewBox="0 0 512 512">
                  <!--!Font Awesome Free 6.6.0 by @fontawesome - https: //fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                  <path fill="white" d="M64 32C28.7 32 0 60.7 0 96l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 32zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 288zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
                </svg>
              `,
              name: 'Backend',
              components: []
            },
            {
              icon: `
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22" viewBox="0 0 448 512">
                    <!--!Font Awesome Free 6.6.0 by @fontawesome - https: //fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                    <path fill="white" d="M448 80l0 48c0 44.2-100.3 80-224 80S0 172.2 0 128L0 80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6L448 288c0 44.2-100.3 80-224 80S0 332.2 0 288L0 186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6l0 85.9c0 44.2-100.3 80-224 80S0 476.2 0 432l0-85.9z" />
                </svg>
              `,
              name: 'Databases',
              components: []
            },
            {
              icon: '',
              name: 'DevOps',
              components: []
            },
            {
              icon: '',
              name: 'Mobile App',
              components: []
            }
          ];

}