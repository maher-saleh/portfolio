// import { CommonModule } from '@angular/common';
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

  constructor(private sanitizer: DomSanitizer) {

  }

  sendData() {
    this.selectedTopicChange.emit(this.selected_topic);
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
    
    // Get links
    const links = document.querySelectorAll(".side-panel li");

    // Remove "active" class from all links
    links.forEach(l => l.classList.remove("active"));

    // Add "active" class to the clicked link
    const parentLi = event.target.closest('li');
    if (parentLi) {
      parentLi.classList.add("active");
    }

    // Set selected_topic value
    
    const childA = parentLi.querySelector('a');
    this.selected_topic = childA.innerHTML == 'Home' ? '' : childA.innerHTML;

    // Notify parent component with selected_topic change
    this.sendData();
  }
}

