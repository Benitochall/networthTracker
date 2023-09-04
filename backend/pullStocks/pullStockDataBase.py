import sqlite3

tables = ["voo", "googl", "pltr"]
voo_sum = 0; 
googl_sum =0; 
pltr_sum = 0; 

# opens the database using SQLite
with sqlite3.connect('/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/stockDatabase.sqlite') as connection:

    cursor = connection.cursor()
    for table in tables:
        cursor.execute("SELECT SUM (amount) FROM {}".format(table))
        partial_sum = cursor.fetchone()[0]
        if (table == "voo"):
            voo_sum += partial_sum
        elif (table == "googl"):
            googl_sum += partial_sum
        elif (table == "pltr"):
            pltr_sum += partial_sum
print(f"VOO: {voo_sum}, GOOGL: {googl_sum}, PLTR: {pltr_sum}")