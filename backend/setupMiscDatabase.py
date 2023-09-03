import sqlite3
from datetime import datetime

# get current date and format it as a string
current_datetime = datetime.now()
formatted_date = current_datetime.strftime("%m/%d/%Y")

# opens the data base using sqlite 
with sqlite3.connect('networthdatabase.sqlite') as connection:
    
    cursor = connection.cursor() # you always need to estabolish a server connection
    # creates a table with date place and amount 

    create_table_gas = """
    CREATE TABLE IF NOT EXISTS gas (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """

    create_table_education = """
    CREATE TABLE IF NOT EXISTS education (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """

    create_table_gifts = """
    CREATE TABLE IF NOT EXISTS gifts (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """

    create_table_earninigs = """
    CREATE TABLE IF NOT EXISTS earnings (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """

    create_table_rent = """
    CREATE TABLE IF NOT EXISTS rent (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """
    create_table_food = """
    CREATE TABLE IF NOT EXISTS food (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """

    create_table_clothing = """
    CREATE TABLE IF NOT EXISTS clothing (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """

    create_table_travel = """
    CREATE TABLE IF NOT EXISTS travel (
        entry_number INTEGER PRIMARY KEY,
        date TEXT,
        place TEXT,
        amount DOUBLE
    )
    """
    # creates the table
    cursor.execute(create_table_sql) 

    # inserts the newest values into the table
    insert_data_sql = """
    INSERT INTO miscspending (date, place, amount)
    VALUES (?, ?, ?)
    """
    # date will be formatted as MM/DD/YYYY

    data_to_insert = (formatted_date, 'AllTime', 4173.58)
    cursor.execute(insert_data_sql, data_to_insert)