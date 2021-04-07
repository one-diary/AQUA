  
import requests
from bs4 import BeautifulSoup

def main(query):
    query = query.replace(" ", "_")

    URL = "https://en.wikipedia.org/wiki/{query}".format(query=query)

    response = requests.get(url=URL)

    soup = BeautifulSoup(response.content.decode("utf8"), 'html.parser')
    title = soup.find(id="bodyContent").find_all('p')

    content = ""

    title = title[:6]
    for item in title:
        if item == '\n':
            continue
        content += item.get_text()

    content = content.replace("\'", "")
    content = content.replace("\"", "")
    content = content.replace("\n", "")
    content = content.replace("\t", "")        

    # print(content)
    return content