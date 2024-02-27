import { Component, OnInit } from '@angular/core';
// import { sidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  // providers: [sidebarAdminComponent]
})
export class HeaderAdminComponent implements OnInit {
  
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js';
    document.body.appendChild(script);
  }

}

