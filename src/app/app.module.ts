import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/gurds/auth.guard';
import { AuthModule } from './modules/authmodule/auth.module';

import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loaderComponent/loader.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderRouterModule,
    AuthModule,
  ],
  providers: [AuthGuard,DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
