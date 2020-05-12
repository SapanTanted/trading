import { concat } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatestStockPriceTableItem } from './latest-stock-price-table/latest-stock-price-table-datasource';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbApiService {
  hostname="localhost"
  port = "8081"
  apiURL=`http://${this.hostname}:${this.port}/api`
  interdayDataURL=`${this.apiURL}/interday_data?`
  constructor(private httpClient:HttpClient) { }
  getLatestStockPriceTableItem(page,pageSize,sortColumns):Observable<LatestStockPriceTableItem[]>{
    return this.httpClient.get<LatestStockPriceTableItem[]>(this.interdayDataURL+"&_sort="+sortColumns.join(",")+"&_size="+pageSize+"&_p="+page);
  }
}
