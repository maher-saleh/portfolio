import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-webview',
  templateUrl: 'webview.html',
  // styleUrls: ['webview.css']
})
export class WebviewComponent {
  sanitizedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const url = "https://example.com";
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}