# Default application structure

## app.module.ts

This is the entry point of the application, normally it should always stay untouched, as all its depending module will be imported inside. It has some responsabilities :

Importing the necessary BrowserModule and BrowserAnimationsModule from Angular Core
Bootstraping the **app.component** : the global application shell layout
Importing the **core.module** : the core services and components only known by the app.module
Importing the **app-routing.module** : the top-level routes of your app
As you can see, this is the simplest app.module.

````javascript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStarterService } from './app-starter.service';
 
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
    ],
    providers: [
      AppStarterService
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {}
````

It's holding the application shell => the container of the Single Page Application (SPA). Basically it contains the layout (header/nav-bar/content/footer) and all interactions that can happen at the highest level of the application component structure (see more info for configuring the app-shell and its available options here)
