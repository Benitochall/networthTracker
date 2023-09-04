from yahoo_fin.stock_info import get_live_price
import sys
import sqlite3

database_to_update = sys.argv[1]
amount = sys.argv[2]
place = sys.argv[3]

# we need to calculate the current value of that stock
# place should store that value
ticker = place.upper()
database_to_update = place.lower()


current_eval = get_live_price(ticker)
amount_of_stock_bought = float(amount)/float(current_eval)
print(f"{ticker}, {amount_of_stock_bought}")

# now we go into the database and update the amount of stock we have
with sqlite3.connect('/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/stockDatabase.sqlite') as connection:
    cursor = connection.cursor()
    insert_data_sql = f"""
    INSERT INTO {database_to_update} (amount)
    VALUES (?)
    """

    data_to_insert = (amount_of_stock_bought,)
    cursor.execute(insert_data_sql, data_to_insert)
