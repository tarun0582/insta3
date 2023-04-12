import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements Resolve<Observable<{ loading: boolean }>> {
    resolve(route: any): Observable<{ loading: boolean }> {
      // Set the loading property to true in the route data
      route.data = { loading: true };
  
      return new Observable<{ loading: boolean }>((observer) => {
        setTimeout(() => {
          observer.next({ loading: true });
          observer.complete();
        }, 2000);
      }).pipe(delay(1000));
    }
  }
