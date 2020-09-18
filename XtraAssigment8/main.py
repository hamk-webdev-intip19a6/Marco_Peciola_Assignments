# coding=utf-8
from PIL import Image
from bs4 import BeautifulSoup as BeautifulSoppa
import requests, os, re
from io import BytesIO

def GetAllImages(url):
    try:
        soup = BeautifulSoppa(requests.get(url).content, 'lxml')
        imgArray = []
        for img in soup.findAll('img'):
            imgArray.append(img.get('src'))
        return imgArray
    except HTMLParseError:
        print ("Could not parse url")

def download(url):
    try:
        pathname = "images"
        if not os.path.isdir(pathname):
            os.makedirs(pathname)
        response = requests.get(url, stream=True)
        filename = os.path.join(pathname, url.split("/")[-1])
        new_file = filename.split(".")[0]
        try:
            g = re.search(r'/([\w_-]+[.](jpg|jpeg|gif|png))$', url)
            if g:
                img = Image.open(BytesIO(response.content)).convert('RGB')
                if img.height > 300 or img.width > 300:
                    get_pixels = img.height * img.width
                    if get_pixels > 1000:
                        width = (img.width)
                        height = (img.height)
                        size = (int(width/2), int(height/2))
                        img = img.resize((size), Image.BOX)
                        new_file = new_file + "cropped"
                    img.save(new_file + ".jpg")
        except Image.UnidentifiedImageError as error:
            print(format(error))
        except SchemaError as error:
            print(SCHEMA_ERROR.format(error))
    except OSError as error:
        print(SCHEMA_ERROR.format(error))


def main():
    url = input("Enter URL to extract files from: ")
    imgs = GetAllImages(url)
    for img in imgs:
        download(img)

if __name__ == "__main__":
    main()