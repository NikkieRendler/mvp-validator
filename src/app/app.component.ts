import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent {
    ngOnInit() {
        console.log('Subdomain from client: ' + window.location.host.split('.')[0]);
    }
}
