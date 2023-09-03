#This file pulls the stock data I need 
from yahoo_fin.stock_info import get_live_price

stock_array = ["VOO", "GOOGL", "PLTR"]

dict_of_stocks = {}
string_stocks = ""

for stock in stock_array:
    current_eval = get_live_price(stock)
    print(f"{stock}: {current_eval}," , end="")



