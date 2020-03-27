import { Component, OnInit, ViewChild } from "@angular/core";
import * as faker from "faker";
import * as emojii from "node-emoji";

import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

@Component({
  selector: "app-infinite-scroll",
  templateUrl: "./infinite-scroll.component.html",
  styleUrls: ["./infinite-scroll.component.sass"]
})
export class InfiniteScrollComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static:false})
  viewport: CdkVirtualScrollViewport;
  people;

  constructor() {
    // this.viewport.scrollToIndex(23);

    this.people = Array(100)
      .fill(2)
      .map(_ => {
        // console.log(emojii.random());
        return {
          name: faker.name.findName(),
          bio: faker.hacker.phrase(),
          emoji: emojii.random().emoji
        };
      });
  }

  getNextBatch(ev) {
    console.log(ev);
    console.log(this.viewport);
    // this.viewport.scrollToIndex(23);
  }

  ngOnInit(): void {}
}
