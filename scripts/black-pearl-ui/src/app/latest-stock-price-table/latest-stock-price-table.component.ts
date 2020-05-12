import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LatestStockPriceTableDataSource, LatestStockPriceTableItem } from './latest-stock-price-table-datasource';
import { DbApiService } from '../db-api.service';

@Component({
  selector: 'app-latest-stock-price-table',
  templateUrl: './latest-stock-price-table.component.html',
  styleUrls: ['./latest-stock-price-table.component.less']
})
export class LatestStockPriceTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatTable) table: MatTable<LatestStockPriceTableItem>;
  dataSource: LatestStockPriceTableDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','symbol','series','date','prev_close','open_price','high_price','low_price','last_price','close_price','vwap','total_traded_quantity','turnover','number_of_trades','deliverable_quantity','percent_of_deliverable_quantity_to_traded_quantity'];
  constructor(private dbApi:DbApiService){
  }
  ngOnInit() {
    this.dataSource = new LatestStockPriceTableDataSource(this.dbApi);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  changes(event){
    console.log(event);
  }
}
