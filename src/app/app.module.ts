import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule} from "@angular/cdk/scrolling";
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component'

// import { AccordionModule } from "primeng/accordion";
// import { MenuItem } from "primeng/api";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollComponent,
    VirtualScrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    // AccordionModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
