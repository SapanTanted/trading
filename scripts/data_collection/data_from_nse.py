import os
import requests as req
import bs4 as bs
import csv
from datetime import date
import json 

dataDir="/home/sapan/Desktop/trading/data/"

# json.dump(list(companySymbols),open(dataDir+'company_list.json','w'))
companySymbols=json.load(open(dataDir+"company_list.json",'r'))

def getTodayData():
    link = "https://www.nseindia.com/products/content/sec_bhavdata_full.csv"
    csvData = req.get(link).text
    directory=dataDir+"daily/"
    if not os.path.exists(directory):
        os.makedirs(directory)
    f = open(directory+str(date.today().strftime("%d-%m-%Y"))+".csv","w")
    f.write(str(csvData))
    f.close()

def getAllData(companySymbol,year):
    #fromDate & toDate format: dd-mm-yyyy
    year = str(year)
    link = "https://www.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol="+companySymbol+"&segmentLink=3&symbolCount=1&series=EQ&dateRange=&fromDate=01-01-"+year+"&toDate=31-12-"+year+"&dataType=PRICEVOLUMEDELIVERABLE"
    headers={
        "Host": "www.nseindia.com",
        "Connection": "keep-alive",
        "Accept": "*/*",
        "DNT": "1",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Referer": "https://www.nseindia.com/products/content/equities/equities/eq_security.htm",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6",
        "Cookie": "ak_bmsc=7122C0E1949135DBD01FF711C2A52C3F73F8EE5584740000190FCB5DA5693C58~plj8TkpYBV1rSnYYtARuYjGk2UuJiC+HYKbcAgVDqYQYwKJxUItSjDu+nWtmzwNgMoeub/qLKgm8KxJYZVBLktB/LSGte96fKNbV+CiimpRTvet9Itf5DsW3nWVmVTggH5L12WXpUwvDrwxo7KIAqqY6LWI7SYi/of2TAlVejy7LcowJwW88RRTmTZDDVHEUP0RsYIrrbbVHMxlsNOilkpaX4uKsFnqnrPVPYZsCNIT2ycXimTvMItzBsyBp8dt9L/; pointer=1; sym1=YESBANK; NSE-TEST-1=1927290890.20480.0000; JSESSIONID=84A4EA988CBA4DCAF95A15A57B750F21.tomcat1; RT='z=1&dm=nseindia.com&si=0f07cb9c-2e09-4ed3-9505-b287dab7ba2d&ss=k2waifx4&sl=0&tt=0&bcn=%2F%2F684fc536.akstat.io%2F&nu=f7bc427b0f3c6a7ef9a6ae69a1f5d668&cl=282a1'; bm_sv=355BCBF1C6C4D328C799FF1150E94447~4rcXYy3ytQNHXRSWAFsknO1e9fTBr3MfEuAkQNZkgCZifbvPUoQUeHQvbTWcIu8pcf/6UFiGaOMHt/VTSUGeo8ZKSG7UIJePwfqjYIpukk9QxaMj+WRIxGjP5y5XXV7lz9MhMjdMAoRutBSchyGQUHaMZDug5BlnC7+NZMxSMKA="
    }
    source = req.get(link,headers=headers).text
    soup = bs.BeautifulSoup(source,'lxml')
    csvContentDiv = soup.find(id="csvContentDiv")
    if csvContentDiv is None:
        print("None",companySymbol,year)
        return 
    csvData = csvContentDiv.string
    csvData = csvData.replace(":","\n")
    directory=dataDir+"company/"+companySymbol+"/"
    if not os.path.exists(directory):
        os.makedirs(directory)
    f = open(directory+companySymbol+"_"+year+".csv","w")
    f.write(csvData)
    f.close()

def getLatestData(companySymbols):
    year = date.today().year
    for companySymbol in companySymbols:
        print(companySymbol,year)
        getAllData(companySymbol,year)

# offset = len(companySymbols) - 1 #companySymbols.index("MANAKALUCO") # 0
# for companySymbol in companySymbols[offset:]:
#     for year in range(1995,2020,1):
#         print(companySymbol,year)
#         getAllData(companySymbol,year)

# [print(companySymbol,year) for companySymbol in companySymbols for year in range(1995,2020,1) if companySymbol>"V" ]

getLatestData(companySymbols)