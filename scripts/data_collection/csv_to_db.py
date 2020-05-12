from datetime import datetime
import pandas as pd 
import numpy as np
import os
import requests as req
import bs4 as bs
import csv
from datetime import date
import json 
import os 
import csv
import mysql.connector
from mysql.connector import Error
mydb = mysql.connector.connect(host='localhost',
                                         database='black_pearl',
                                         user='root',
                                         password='')
cursor = mydb.cursor()

mydb = mysql.connector.connect(host='localhost',
    user='root',
    passwd='',
    db='black_pearl')
cursor = mydb.cursor()
dataDir="C:\\Users\\Sapan Tanted\\Desktop\\trading\\data\\"
companySymbols=json.load(open(dataDir+"company_list.json",'r'))
for company in companySymbols:
    companyDir = dataDir+"company\\"+company+"\\"
    if(os.path.exists(companyDir)):
        for companyData in (os.scandir(companyDir)):
            fileName = (companyData.name)
            print(fileName)
            filePath = companyDir+fileName
            csv_data = pd.read_csv(filePath)
            for row in csv_data.iterrows():
                insert_query = "insert ignore into interday_data(`symbol`, `series`, `date`, `prev_close`, `open_price`, `high_price`, `low_price`, `last_price`, `close_price`, `vwap`, `total_traded_quantity`, `turnover`, `number_of_trades`, `deliverable_quantity`, `percent_of_deliverable_quantity_to_traded_quantity`) values("
                row[1][2] = datetime.strptime(row[1][2], '%d-%b-%Y')
                for value in row[1]:
                    if(value=="-"):
                        insert_query = insert_query+"null,"
                    else:
                        insert_query =insert_query+"'"+str(value)+"',"
                insert_query = insert_query[:-1]+")"
                result = cursor.execute(insert_query)
    mydb.commit()
#close the connection to the database.
cursor.close()
print("Done")

    