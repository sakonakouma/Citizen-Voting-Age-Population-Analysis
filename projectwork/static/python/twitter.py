import pandas as pd
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser


executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)


url_3 = 'https://twitter.com/marswxreport?lang=en'
browser.visit(url_3)

html = browser.html
soup = bs(html, 'html.parser')

mars_weather = soup.find('div', class_='css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0')\
.find('span', class_='css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0').get_text()

print(mars_weather)