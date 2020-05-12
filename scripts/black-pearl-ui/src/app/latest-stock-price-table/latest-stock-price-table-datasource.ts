import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DbApiService } from '../db-api.service';

// TODO: Replace this with your own data model type
export interface LatestStockPriceTableItem {
  id: number|null;
  symbol: string|null;
  series: string|null;
  date: Date|null;
  prev_close: number|null;
  open_price: number|null;
  high_price: number|null;
  low_price: number|null;
  last_price: number|null;
  close_price: number|null;
  vwap: number|null;
  total_traded_quantity: number|null;
  turnover: number|null;
  number_of_trades: number|null;
  deliverable_quantity: number|null;
  percent_of_deliverable_quantity_to_traded_quantity: number|null;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: LatestStockPriceTableItem[] = [
  {id: 12, symbol: "YESBANK", series: "EQ", date: new Date(), prev_close: 12, open_price: 12, high_price: 12, low_price: 12, last_price: 12, close_price: 12, vwap: 12, total_traded_quantity: 12, turnover: 12, number_of_trades: 12, deliverable_quantity: 12, percent_of_deliverable_quantity_to_traded_quantity: 12 },
  {id: 13, symbol: "YESBANK", series: "EQ", date: new Date(), prev_close: 12, open_price: 12, high_price: 12, low_price: 12, last_price: 12, close_price: 12, vwap: 12, total_traded_quantity: 12, turnover: 12, number_of_trades: 12, deliverable_quantity: 12, percent_of_deliverable_quantity_to_traded_quantity: 12 },
  {id: 14, symbol: "YESBANK", series: "EQ", date: new Date(), prev_close: 12, open_price: 12, high_price: 12, low_price: 12, last_price: 12, close_price: 12, vwap: 12, total_traded_quantity: 12, turnover: 12, number_of_trades: 12, deliverable_quantity: 12, percent_of_deliverable_quantity_to_traded_quantity: 12 },
  {id: 15, symbol: "YESBANK", series: "EQ", date: new Date(), prev_close: 12, open_price: 12, high_price: 12, low_price: 12, last_price: 12, close_price: 12, vwap: 12, total_traded_quantity: 12, turnover: 12, number_of_trades: 12, deliverable_quantity: 12, percent_of_deliverable_quantity_to_traded_quantity: 12 },
  {id: 16, symbol: "YESBANK", series: "EQ", date: new Date(), prev_close: 12, open_price: 12, high_price: 12, low_price: 12, last_price: 12, close_price: 12, vwap: 12, total_traded_quantity: 12, turnover: 12, number_of_trades: 12, deliverable_quantity: 12, percent_of_deliverable_quantity_to_traded_quantity: 12 },
];

/**
 * Data source for the LatestStockPriceTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LatestStockPriceTableDataSource extends DataSource<LatestStockPriceTableItem> {
  data: LatestStockPriceTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  constructor(private dbApi: DbApiService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<LatestStockPriceTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.dbApi.getLatestStockPriceTableItem(this.paginator.pageIndex+1,this.paginator.pageSize,["-date"]),
      this.paginator.page,
      this.sort.sortChange
    ];
    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));
    return merge(...dataMutations);//this.dbApi.getLatestStockPriceTableItem(this.paginator.pageIndex+1,this.paginator.pageSize,["-date"]);


  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: LatestStockPriceTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: LatestStockPriceTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id,+b.id,isAsc)
        case 'symbol': return compare(a.symbol,b.symbol,isAsc)
        case 'series': return compare(a.series,b.series,isAsc)
        case 'date': return compare(a.date,b.date,isAsc)
        case 'prev_close': return compare(+a.prev_close,+b.prev_close,isAsc)
        case 'open_price': return compare(+a.open_price,+b.open_price,isAsc)
        case 'high_price': return compare(+a.high_price,+b.high_price,isAsc)
        case 'low_price': return compare(+a.low_price,+b.low_price,isAsc)
        case 'last_price': return compare(+a.last_price,+b.last_price,isAsc)
        case 'close_price': return compare(+a.close_price,+b.close_price,isAsc)
        case 'vwap': return compare(+a.vwap,+b.vwap,isAsc)
        case 'total_traded_quantity': return compare(+a.total_traded_quantity,+b.total_traded_quantity,isAsc)
        case 'turnover': return compare(+a.turnover,+b.turnover,isAsc)
        case 'number_of_trades': return compare(+a.number_of_trades,+b.number_of_trades,isAsc)
        case 'deliverable_quantity': return compare(+a.deliverable_quantity,+b.deliverable_quantity,isAsc)
        case 'percent_of_deliverable_quantity_to_traded_quantity': return compare(+a.percent_of_deliverable_quantity_to_traded_quantity,+b.percent_of_deliverable_quantity_to_traded_quantity,isAsc)
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
