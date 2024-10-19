from httpx import Client
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def main():
    """Main endpoint of the api."""

    return "Hello fellow Developer. Please don't use this api, it's private btw."

@app.get("/from-slideshow")
def scrape_slideshow(url: str):
    """Get Data from slideshow using his url."""

    data = get_from_slideshow(url)
    return data

def extract_from_slideshow(link):
    """Get Data from slideshow using his url."""

    url = "https://ttsave.app/download"

    data = {"query": link,"language_id":"1"}
    session = Client()

    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 6a Build/TQ3A.230805.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 MicroAdBot/1.1 (https://www.microad.co.jp/contact/)"
    }

    cookies = {
        "cf_clearance": "zl5NTyZrxt2UYkMqlzyxacBbYdAhhaFrMnqwfQBtyhg-1725188085-1.2.1.1-.kPvg7wdzPFSqHuTzP2vWZgS5C_pHRfhfxoLUDEre5Z.yx8aaK5lxcUzMSHaSBuAdMz_EhAvUYFYG6nFUGOzEBWRkTC42IZCaU6E1YTLWdsxUIWTKnULFBEoNEqLBrwwR56p0gzBQ2mck.kysL275PiLppDPGN82P8P7RQq2w47xtGKh6DxsfTFIXSn1BCELnkFpL4XyBUL9TitdeccPnsLd_gPtqKDTdiK2G3blwlN9UB.BNUBjsMiwTsuCP3mFWVn5QYNRYFzCiACfjxvrpH_QGUl0ES2o3abKfhuWrcCjN4DLoCkA.bRp.hy5dgYNhQPfkd5_D0pav7uXnbg7cDdN6TIe8n.7xR9JpHcTFknpFaxCJkVoVhfdjXRZs03mUE9O2U.PQs1_0ooGcI1mhQ",
    }

    resp = session.post(url, json=data, timeout=60, headers=headers, cookies=cookies)
    html = BeautifulSoup(resp.text, 'html.parser')
    error_element = html.find("p")
    
    if error_element.text == "Error unknown":
        return "", "", "", "", ""
    else:
        img_list = [elem["src"] for elem in html.find_all('img')]
        h2_list = [elem.string for elem in html.find_all('h2')]
        p_list = [elem.string for elem in html.find_all('p')]
        audio_url = html.find("a", {"type": "audio"}).get("href")

        return img_list[1:], audio_url, p_list[0].strip(), h2_list[0]

def get_from_slideshow(url):
    """Return scraped data of slideshow."""

    img_list, music_url, video_description, author_name = extract_from_slideshow(url)
    video_id = round(time.time())


    song_data = {
        'music_url': music_url,
        'video_author': author_name,
        'video_description': video_description,
        'filename': f'TikSlides-{author_name}:{video_id}.mp4',
        'slides_url': img_list,
    }

    return song_data if music_url != "" else "Not Found"


uvicorn.run(app)