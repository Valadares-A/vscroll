import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, scan, mergeMap, throttleTime } from "rxjs/operators";

import * as faker from "faker";
import * as emojii from "node-emoji";

import { LazyLoadEvent } from "primeng/api";
import { RequestsService } from '../requests.service';

const batchSize = 20;

@Component({
  selector: "app-virtual-scroll",
  templateUrl: "./virtual-scroll.component.html",
  styleUrls: ["./virtual-scroll.component.sass"]
})
export class VirtualScrollComponent implements OnInit {
  // @ViewChild(CdkVirtualScrollViewport)
  // viewport: CdkVirtualScrollViewport;
  // people;

  // theEnd = false;

  // offset = new BehaviorSubject(null);
  // infinite: Observable<any[]>;

  // constructor() {}

  // nextBatch(ev, offset){
  //   if (this.theEnd) {
  //     return
  //   }

  //   const end = this.viewport.getRenderedRange().end;
  //   const total = this.viewport.getDataLength();

  //   if (end === total) {
  //     this.offset.next(offset);
  //   }

  // }

  // trackByIdx(idx){
  //   return idx;
  // }

  // getBatch(ev){

  // }

  // ngOnInit(): void {}

  // ####################### prime

  people;

  // cars1: Car[];

  // cars2: Car[];

  // cars3: Car[];

  // cars4: Car[];

  // cars5: Car[];

  virtualCars = [];

  totalRecords: number;

  cols: any[];

  // frozenCars: Car[];

  frozenCols: any[];

  scrollableCols: any[];

  sales: any[];

  loading: boolean;

  inmemoryData = [];
  test = [];

  // constructor(private carService: CarService) {}
  constructor(private request: RequestsService) {}

  async ngOnInit() {
    let hue = await this.request.getOperationsPaginated(25);
    console.log(hue);
    console.log(hue["content"]);
    
    
    
    // this.carService.getCarsMedium().then(cars => (this.cars1 = cars));
    // this.carService.getCarsSmall().then(cars => (this.cars2 = cars));
    // this.carService.getCarsMedium().then(cars => (this.cars3 = cars));
    // this.carService.getCarsMedium().then(cars => (this.cars4 = cars));
    // this.carService.getCarsMedium().then(cars => (this.cars5 = cars));

    this.inmemoryData = Array(100)
      .fill(2)
      .map(_ => {
        // console.log(emojii.random());
        return {
          name: faker.name.findName(),
          bio: faker.hacker.phrase(),
          emoji: emojii.random().emoji,
          vin: 0
        };
      });

    this.cols = [
      { field: "vin", header: "Vin" },
      { field: "name", header: "Name" },
      { field: "bio", header: "Bio" },
      { field: "emoji", header: "Emoji" },
    ];

    // this.scrollableCols = [
    //   { field: "year", header: "Year" },
    //   { field: "brand", header: "Brand" },
    //   { field: "color", header: "Color" },
    //   { field: "year", header: "Year" },
    //   { field: "brand", header: "Brand" },
    //   { field: "color", header: "Color" }
    // ];

    // this.frozenCols = [{ field: "vin", header: "Vin" }];

    // this.frozenCars = [
    //   { brand: "BMW", year: 2013, color: "Grey", vin: "fh2uf23" },
    //   { brand: "Chevrolet", year: 2011, color: "Black", vin: "4525g23" }
    // ];

    // this.sales = [
    //   {
    //     brand: "Apple",
    //     lastYearSale: "51%",
    //     thisYearSale: "40%",
    //     lastYearProfit: "$54,406.00",
    //     thisYearProfit: "$43,342"
    //   },
    //   {
    //     brand: "Samsung",
    //     lastYearSale: "83%",
    //     thisYearSale: "96%",
    //     lastYearProfit: "$423,132",
    //     thisYearProfit: "$312,122"
    //   },
    //   {
    //     brand: "Microsoft",
    //     lastYearSale: "38%",
    //     thisYearSale: "5%",
    //     lastYearProfit: "$12,321",
    //     thisYearProfit: "$8,500"
    //   },
    //   {
    //     brand: "Philips",
    //     lastYearSale: "49%",
    //     thisYearSale: "22%",
    //     lastYearProfit: "$745,232",
    //     thisYearProfit: "$650,323,"
    //   },
    //   {
    //     brand: "Song",
    //     lastYearSale: "17%",
    //     thisYearSale: "79%",
    //     lastYearProfit: "$643,242",
    //     thisYearProfit: "500,332"
    //   },
    //   {
    //     brand: "LG",
    //     lastYearSale: "52%",
    //     thisYearSale: " 65%",
    //     lastYearProfit: "$421,132",
    //     thisYearProfit: "$150,005"
    //   },
    //   {
    //     brand: "Sharp",
    //     lastYearSale: "82%",
    //     thisYearSale: "12%",
    //     lastYearProfit: "$131,211",
    //     thisYearProfit: "$100,214"
    //   },
    //   {
    //     brand: "Panasonic",
    //     lastYearSale: "44%",
    //     thisYearSale: "45%",
    //     lastYearProfit: "$66,442",
    //     thisYearProfit: "$53,322"
    //   },
    //   {
    //     brand: "HTC",
    //     lastYearSale: "90%",
    //     thisYearSale: "56%",
    //     lastYearProfit: "$765,442",
    //     thisYearProfit: "$296,232"
    //   },
    //   {
    //     brand: "Toshiba",
    //     lastYearSale: "75%",
    //     thisYearSale: "54%",
    //     lastYearProfit: "$21,212",
    //     thisYearProfit: "$12,533"
    //   }
    // ];

    // this.totalRecords = 250000;
    this.totalRecords = 100;
    this.loading = true;

    // this.inmemoryData = [
    //   { name: "Teste", bio:"Teste", emoji: emojii.random().emoji, vin: 0 },
    // ];
  }

  loadDataOnScroll(event: LazyLoadEvent) {
    this.loading = true;

    //for demo purposes keep loading the same dataset
    //in a real production application, this data should come from server by building the query with LazyLoadEvent options
    setTimeout(() => {
      //last chunk
      if (event.first === 249980)
        this.virtualCars = this.loadChunk(event.first, 20);
      else this.virtualCars = this.loadChunk(event.first, event.rows);

      this.loading = false;
    }, 250);
  }

  loadChunk(index, length) {
    let chunk = [];
    for (let i = 0; i < length; i++) {
      chunk[i] = { ...this.inmemoryData[i], ...{ vin: index + i } };
    }
    console.log(chunk);
    
    return chunk;
  }
}
