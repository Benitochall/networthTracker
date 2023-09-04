import sqlite3

# opens the database using SQLite
with sqlite3.connect('/Users/benitochall/Documents/personalDevelopment/aboutMeProject/aboutMe/backend/stockDatabase.sqlite') as connection:

    cursor = connection.cursor()  # you always need to establish a server connection

    # Define table creation and insertion statements for each table
    tables = [
        ("voo", 2.91097),
        ("pltr", 15.00),
        ("googl", 5.00),
    ]

    for table_info in tables:
        table_name, amount = table_info

        create_table_sql = f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            entry_number INTEGER PRIMARY KEY,
            amount DOUBLE
        )
        """

        insert_data_sql = f"""
        INSERT INTO {table_name} (amount)
        VALUES (?)
        """

        cursor.execute(create_table_sql)
        data_to_insert = (amount,)  # Add a comma to create a tuple
        cursor.execute(insert_data_sql, data_to_insert)
