import sqlite3
from datetime import datetime

# get current date and format it as a string
current_datetime = datetime.now()
formatted_date = current_datetime.strftime("%m/%d/%Y")

# opens the database using SQLite
with sqlite3.connect('database.sqlite') as connection:

    cursor = connection.cursor()  # you always need to establish a server connection

    # Define table creation and insertion statements for each table
    tables = [
        ("gas", formatted_date, 'AllTime', 0.00),
        ("education", formatted_date, 'AllTime', 0.00),
        ("gifts", formatted_date, 'AllTime', 0.00),
        ("earnings", formatted_date, 'AllTime', 0.00),
        ("rent", formatted_date, 'AllTime', 0.00),
        ("food", formatted_date, 'AllTime', 0.00),
        ("clothing", formatted_date, 'AllTime', 0.00),
        ("travel", formatted_date, 'AllTime', 0.00),
        ("misc", formatted_date, 'AllTime', 0.00),
        ("amountInvested", formatted_date, 'AllTime', 3000.00),
        ("initial", formatted_date, 'AllTime', 8685.52),
        ("addToInvestmentAccount", formatted_date, 'AllTime', 0.00)
    ]

    for table_info in tables:
        table_name, date, place, amount = table_info

        create_table_sql = f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            entry_number INTEGER PRIMARY KEY,
            date TEXT,
            place TEXT,
            amount DOUBLE
        )
        """

        insert_data_sql = f"""
        INSERT INTO {table_name} (date, place, amount)
        VALUES (?, ?, ?)
        """

        cursor.execute(create_table_sql)
        data_to_insert = (date, place, amount)
        cursor.execute(insert_data_sql, data_to_insert)