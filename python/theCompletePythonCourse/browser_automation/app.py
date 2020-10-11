from selenium import webdriver

from pages.quotes_page import InvalidTagForAuthorError, QuotesPage

try:
    author = input("Enter the author you'd like quotes from: ")
    tag = input('Enter your tag: ')

    chrome = webdriver.Chrome(
        executable_path="/home/camilo/Downloads/chromedriver_linux64/chromedriver")
    chrome.get("http://quotes.toscrape.com/search.aspx")
    page = QuotesPage(chrome)

    print(page.search_for_quotes(author, tag))
except InvalidTagForAuthorError as e:
    print(e)
except Exception as e:
    print(e)
    print('An unkonwn error occurred. Try again.')
