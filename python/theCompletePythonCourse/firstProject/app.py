MENU_PROMPT = '\nEnter "a" to add a movie, "l" to see your movies, "f" to find a movie by title or q to quit: '
movies = []


def add_movie():
    title = input('Enter the title: ')
    director = input('Enter the director: ')
    year = input('Enter the year: ')

    movies.append({'title': title,
                   'director': director,
                   'year': year
                   })


def show_movies():
    for movie in movies:
        print_movie(movie)


def find_movie():
    movie_title = input('Enter movie title: ')
    for movie in movies:
        if movie['title'] == movie_title:
            print_movie(movie)


def print_movie(movie):
    print(f' Title: {movie["title"]},')
    print(f' Director: {movie["director"]},')
    print(f' Year: {movie["year"]}')


user_options = {
    'a': add_movie,
    'f': find_movie,
    'l': show_movies
}


def menu():
    menu_input = ''
    while(menu_input != "q"):
        menu_input = input(MENU_PROMPT)
        if menu_input in user_options:
            selected_option = user_options[menu_input]
            selected_option()
        else:
            print('Invalid action')


menu()
