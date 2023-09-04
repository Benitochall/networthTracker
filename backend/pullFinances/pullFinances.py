import sqlite3
from datetime import datetime

current_datetime = datetime.now()
formatted_date = current_datetime.strftime("%m/%d/%Y")

# here is the code to update the correct database 


# create an array of table names 
negative_tables = ["gas", "education", "rent", "food", "clothing", "travel", "misc", "amountInvested"]
positive_tables = ["gifts", "earnings", "initial"]

negative_sum = 0
positive_sum = 0

# opens the database using SQLite
with sqlite3.connect('/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/database.sqlite') as connection:

    cursor = connection.cursor()
    for table in negative_tables:
        cursor.execute("SELECT SUM (amount) FROM {}".format(table))
        partial_sum = cursor.fetchone()[0]
        negative_sum += partial_sum

    for table in positive_tables:
        cursor.execute("SELECT SUM (amount) FROM {}".format(table))
        partial_sum = cursor.fetchone()[0]
        positive_sum += partial_sum

print(positive_sum - negative_sum)