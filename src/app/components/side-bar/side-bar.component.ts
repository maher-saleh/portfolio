import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() topics:any[]=[];
  @Output() selectedTopicChange = new EventEmitter<string>();
  
  selected_topic='';

  sendData(topic: string) {
    this.selectedTopicChange.emit(topic);
  }

  categories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile'
  ]
  
  

  side_bar_item_click(event:any){

    // Prevent default behavior
    event.preventDefault();
    
    const parentLi = event.target.closest('li');
    const childA = parentLi.querySelector('a');
    if(this.selected_topic == childA.innerHTML){
      return;
    }

    setTimeout(() => {

      console.log('clicked');
      // Get links
      const links = document.querySelectorAll(".side-panel li");

      // Add "active" class to the clicked link

      // Remove "active" class from all links
      links.forEach(l => l.classList.remove("active"));
      if (parentLi) {
        parentLi.classList.add("active");
      }

      // Set selected_topic value
      this.selected_topic = childA.innerHTML;

      // Notify parent component with selected_topic change
      this.sendData(this.selected_topic);
    }, 0);
  }

  encodeURI(value: string): string {
    return encodeURI(value);
  }
}

