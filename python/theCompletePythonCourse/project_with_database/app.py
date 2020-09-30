from utilities import database

USER_CHOICE = ''' 
Enter:
- "a" to add a new book
- "l" to list all books
- "r" to mark a book as read
- "d" to delete a book
- "q" to quit

Your choice: '''


def prompt_add_book():
    name = input('Enter the new book name: ')
    author = input('Enter the new book author: ')

    database.add_book(name, author)


def list_books():
    books = database.get_all_books()
    if(len(books) == 0):
        print('No books')
    for book in books:
        read = 'yes' if book['read'] else 'no'
        print(f"{book['name']} by {book['author']}, read: {read}")


def prompt_read_book():
    name = input('Enter the name of the book you just finished reading: ')
    database.mark_book_as_read(name)


def prompt_delete_book():
    name = input('Enter the name of the book you want to delete: ')
    database.delete_book(name)


menu_dict = {
    'a': prompt_add_book,
    'l': list_books,
    'r': prompt_read_book,
    'd': prompt_delete_book
}


def menu():
    database.create_book_table()
    user_input = input(USER_CHOICE)
    while user_input != 'q':
        if user_input in menu_dict:
            menu_option = menu_dict[user_input]
            menu_option()
        else:
            print('Unknown command. Try again!')
        user_input = input(USER_CHOICE)


menu()
