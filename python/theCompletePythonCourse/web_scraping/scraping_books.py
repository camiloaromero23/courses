import requests
from bs4 import BeautifulSoup

page = requests.get('http://example.com')
soup = BeautifulSoup(page.content, 'html.parser')
print(soup.find('h1').string)
