import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() topics:any[]=[];
  @Output() selectedTopicChange = new EventEmitter<string>();
  
  selected_topic='';

   getSanitizedIcon(icon: string) {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  constructor(private sanitizer: DomSanitizer) {}

  sendData(topic: string) {
    this.selectedTopicChange.emit(topic);
  }

  categories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile App'
  ]
  
  

  side_bar_item_click(event:any){

    // Prevent default behavior
    event.preventDefault();
    
    const parentLi = event.target.closest('li');
    const childA = parentLi.querySelector('a');
    if(this.selected_topic == childA.innerHTML){
      return;
    }

    // force animation
    if(this.selected_topic){
      this.sendData('Empty');
    }


    setTimeout(() => {
      // Get links
      const links = document.querySelectorAll(".side-panel li");

      // Add "active" class to the clicked link

      // Remove "active" class from all links
      links.forEach(l => l.classList.remove("active"));
      if (parentLi) {
        parentLi.classList.add("active");
      }

      // Set selected_topic value
      this.selected_topic = childA.innerHTML; // == 'Home' ? '' : childA.innerHTML;

      // Notify parent component with selected_topic change
      this.sendData(this.selected_topic);
    }, 0);
  }
}

