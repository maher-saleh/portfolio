import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import data_json from '../../../../assets/home_info.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [],
})

export class HomeComponent implements AfterViewInit, OnDestroy{
  isOpen = 'void';
  @ViewChild('typedTitle') typedTitle!: ElementRef;
  @ViewChild('typedParagraph_1') typedParagraph_1!: ElementRef;
  @ViewChild('typedParagraph_2') typedParagraph_2!: ElementRef;
  @ViewChild('technologies_and_frameworks') technologies_and_frameworks!: ElementRef;
  @ViewChild('technologies_label') technologies_label!: ElementRef;
  @ViewChild('technologies_value') technologies_value!: ElementRef;

  animTitle: any
  animParagraph1: any
  animParagraph2: any
  animTechLabel: any
  animTechValue: any

  info: any = data_json;

  colors = [
    '#ff9b85',
    '#ffd97d',
    '#aaf683',
    '#60d394',
    '#ee6055',
    '#72ddf7',
    '#8093f1',
    '#b388eb',
    '#f7aef8',
    '#fdc5f5',
    '#c1ff9b',
    '#fface4',
    '#79beee',
  ]

  pickRandomColor(): number {
    
    const num = Math.floor(Math.random() * this.colors.length)
    return num;
  }
  
  constructor(private renderer: Renderer2) {}

  ngOnDestroy(): void {
    if (this.animTitle) this.animTitle.destroy();
    if (this.animParagraph1) this.animParagraph1.destroy();
    if (this.animParagraph2) this.animParagraph2.destroy();
    if (this.animTechLabel) this.animTechLabel.destroy();
    if (this.animTechValue) this.animTechValue.destroy();
  }

  ngAfterViewInit(): void {
    const options = {
      backSpeed: 30,
      typeSpeed: 40,
      loopCount: 0,
      showCursor: false,
      cursorChar: '|',
      autoInsertCss: false,
    }
  
    // ANIMATION
    // Header
    this.typedTitle.nativeElement.classList.add('showCursor');
    this.animTitle = new Typed("#typedTitle", {
      ...options,
      startDelay: 5000,
      loop: false,
      strings: [this.info.header],
      onComplete: () => {
        this.typedTitle.nativeElement.classList.remove('showCursor');
        this.typedParagraph_1.nativeElement.classList.add('showCursor');

        // First paragraph
        this.animParagraph1 = new Typed("#typedParagraph_1", {
          ...options,
          startDelay: 2000,
          loop: false,
          strings: [this.info.first_paragaraph],
          onComplete: () => {
        this.typedParagraph_1.nativeElement.classList.remove('showCursor');
        this.typedParagraph_2.nativeElement.classList.add('showCursor');

            // Second paragraph
            this.animParagraph2 = new Typed("#typedParagraph_2", {
              ...options,
              startDelay: 2000,
              loop: false,
              strings: [this.info.second_paragaraph],
              onComplete: () => {
                this.typedParagraph_2.nativeElement.classList.remove('showCursor');
                this.technologies_label.nativeElement.classList.add('showCursor');
                this.technologies_and_frameworks.nativeElement.classList.add('showElement');
                
                // technologies_label
                this.animTechLabel = new Typed("#technologies_label", {
                  ...options,
                  startDelay: 3000,
                  loop: false,
                  strings: [this.info.technologies_label],
                  onComplete: () => {
                    this.technologies_label.nativeElement.classList.remove('showCursor');
                    this.technologies_value.nativeElement.classList.add('showCursor');

                    // technologies_value
                    setTimeout(() => {
                      this.animTechValue = new Typed("#technologies_value", {
                        ...options,
                        startDelay: 0,
                        backDelay: 2500,
                        loop: true,
                        loopCount: Infinity,
                        strings: Object.values(this.info.technologies_value),
                        preStringTyped: (arrayPos, self) => {
                          const num = this.pickRandomColor();
                          const color = this.colors[num];
                          // this.technologies_value.nativeElement.backgroundColor = color;
                          this.renderer.setStyle(this.technologies_value.nativeElement, 'background-color', color);
                        },
                        onComplete: () => {}
                      });
                    }, 3000);
                  }
                });
              }
            });
          }
        });
      },
    });
  }  
}
