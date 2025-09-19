import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

type topic = {
  name: string;
  icon: string;
  components: topic_item[];
}
type topic_item = {
  item: string;
  image: string;
  snippet: string;
  url: string[];  // Corrected to string[] based on usage
  images: string[];
  sanitizedUrls?: any[];  // Add this for cached SafeResourceUrls
}

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
})
export class TopicsComponent implements OnChanges{

  constructor(private sanitizer: DomSanitizer) {}

  getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  
  @Input() topics: topic[]=[];
  @Input() selected_topic = '';
  selected_card: string = '';
  selected_card_str_length: number = 0;
  is_active: boolean = false;
  selected_topic_content: any = {};
  selected_topic_components: topic_item[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Reset active card (if any)
    this.is_active = false;
    this.selected_card = '';
    this.selected_card_str_length = 0;
    const cards = document.querySelectorAll('.card');

    cards.forEach(cardElement => {
      cardElement.classList.remove('active');
    });

    // Change selected topic contents
    // if(this.selected_topic && this.selected_topic !== 'Home' && this.selected_topic !== 'About Me'){
    //   this.selected_topic_content = this.topics.find(item => item.name == this.selected_topic);
    //   this.selected_topic_components = this.selected_topic_content.components;
    // }

    if(this.selected_topic && this.selected_topic !== 'Home' && this.selected_topic !== 'About Me'){
      this.selected_topic_content = this.topics.find(item => item.name == this.selected_topic);
      this.selected_topic_components = this.selected_topic_content.components.map((component: topic_item) => ({
        ...component,
        sanitizedUrls: component.url.map((url: string) => this.sanitizer.bypassSecurityTrustResourceUrl(url))
      }));
    }
  }

  on_click(event: MouseEvent, component: topic_item): void {

    const cards = document.querySelectorAll('.card');
    const card = event.currentTarget as HTMLElement;
    const p = card.querySelector('p.topic_item') as HTMLElement;
    
    cards.forEach(cardElement => {
      cardElement.classList.remove('active');
    });

    if(this.selected_card == p.innerText){
      this.is_active = false;
      this.selected_card = '';
    }else{
      this.is_active = true;
      this.selected_card = p.innerText;
      card.classList.add('active');
    }

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });

    this.scrollToTop(800);
  }

  scrollToTop(duration: number = 500) {
    const start = window.scrollY;
    const startTime = performance.now();

    function animate(time: DOMHighResTimeStamp) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 → 1
      // const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  on_mousemove(event: MouseEvent): void{

    const card = event.currentTarget as HTMLElement;
    
    if (!card.classList.contains('active')){
      const maxRotation = 15; // max rotation angle in degrees
      const maxMovement = 10; // max movement distance in pixels

      const { offsetWidth: width, offsetHeight: height } = card;
      
      // Get the mouse position relative to the card
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // Calculate the percentage of the mouse's position
      const rotateX = ((mouseY / height) - 0.5) * maxRotation;
      const rotateY = ((mouseX / width) - 0.5) * maxRotation;

      const moveX = ((mouseX / width) - 0.5) * maxMovement;
      const moveY = ((mouseY / height) - 0.5) * maxMovement;

      // Apply the transform to create the animation
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${moveX}px) translateY(${moveY}px)`;
    }
  }

  // Reset the card to its original state when the mouse leaves
  resetPosition(event: MouseEvent): void {

    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)';
  }
}
