from typing import Dict, List, Union

from .database_connection import DatabaseConnection

Book = Dict[str, Union[str, int]]


def create_book_table() -> None:
    with DatabaseConnection('data.db') as connection_cursor:
        connection_cursor.execute(
            'CREATE TABLE IF NOT EXISTS books(name text primary key,author text,read integer)')


def add_book(name: str, author: str) -> None:
    with DatabaseConnection('data.db') as connection_cursor:
        connection_cursor.execute(
            'INSERT INTO books VALUES(?,?,0)', (name, author))


def get_all_books() -> List[Book]:
    with DatabaseConnection('data.db') as connection_cursor:
        connection_cursor.execute('SELECT * FROM books')
        books = [{'name': row[0], 'author': row[1], 'read': row[2]}
                 for row in connection_cursor.fetchall()]
    return books


def mark_book_as_read(name: str) -> None:
    with DatabaseConnection('data.db') as connection_cursor:
        connection_cursor.execute(
            'UPDATE books SET read=1 WHERE name=?', (name,))


def delete_book(name: str) -> None:
    with DatabaseConnection('data.db') as connection_cursor:
        connection_cursor.execute('DELETE FROM books WHERE name=?', (name,))
