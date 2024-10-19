import { ArrowLeft, Share, Settings2, ListCheck, ArrowRight } from "lucide-react"
import { useState } from 'react';
import { ItemList } from "../components/List";

type ListItem = {
    id: number;
    url: string;
};

const initialItems: ListItem[] = [
    { id: 1, url: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-i-photomode-euttp/2b86c16b2d5540ce93d22233ad8f183a~tplv-photomode-sr:1080:0:1080:0:q75.jpeg?dr=10823&nonce=48750&refresh_token=504031512e7a1bca1b9dd79caea5584d&x-expires=1730660400&x-signature=DuCx5ZyyyfNtsnaikyV46NhTpR4%3D&biz_tag=tt_photomode&idc=my&ps=28cf8ac7&s=AWEME_DETAIL&sc=image&shcp=1d1a97fc&shp=d05b14bd&t=5897f7ec' },
    { id: 2, url: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-i-photomode-euttp/634e671e8bc644c8984bd159172612dd~tplv-photomode-sr:1080:0:1080:0:q75.jpeg?dr=10823&nonce=58374&refresh_token=504da8ada7b8b3deb345690a87023621&x-expires=1730660400&x-signature=EV8Yg26pHg%2BvO6XDyS6MlX4RWv4%3D&biz_tag=tt_photomode&idc=my&ps=28cf8ac7&s=AWEME_DETAIL&sc=image&shcp=1d1a97fc&shp=d05b14bd&t=5897f7ec' },
];

export default function DownloadPage() {
    const [imgItems, setImgItems] = useState<ListItem[]>(initialItems);
    const [editOpened, setEditOpened] = useState(false)
    const [optionsOpened, setOptionOpened] = useState(false)

    if (!editOpened) {
        return (
            <main className="w-screen h-screen flex flex-col items-center justify-center">
            <section className="*:text-neutral w-full flex justify-between items-center p-4 sm:hidden mt-2">
                <button className="btn btn-ghost">
                    <ArrowLeft/>
                </button>
                <h1 className="text-xl font-bold">Download.</h1>
                <button className="btn btn-ghost">
                    <Share/>
                </button>
            </section>
            <section className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
                { !optionsOpened && (<section className="w-full sm:w-96">
                    <h1 className="w-full text-4xl truncate"><span className="font-bold">Travis's</span> video.</h1>
                    <h3 className="mt-1 text-xl font-semibold w-full truncate">Description.</h3>
                </section>)}
                { /* Carousel */ }
                { !optionsOpened && (<div className="w-80 h-80 sm:h-96 sm:w-96 bg-primary rounded-lg"></div>)}
                <section className={`w-full flex sm:w-96 items-center ${ !optionsOpened ? "justify-between" : "justify-start"} gap-2`}>
                    <button className="btn btn-square" onClick={() => setOptionOpened(!optionsOpened)}>
                        <Settings2/>
                    </button>
                    { !optionsOpened && (<div className="flex gap-4 items-center justify-center bg-base-200 rounded-lg">
                        <button className="btn btn-ghost">
                            <ArrowLeft/>
                        </button>
                        <h1 className="text-2xl font-bold">1/5</h1>
                        <button className="btn btn-ghost">
                            <ArrowRight/>
                        </button>
                    </div>)}
                    <button className="btn btn-square" onClick={() => setEditOpened(true)}>
                        <ListCheck/>
                    </button>
                </section>
                { optionsOpened && (<section className="w-full sm:w-96 flex flex-col gap-3 items-center justify-center">
                    <h1 className="w-full text-3xl font-bold">Options.</h1>
                    <div className="w-full flex flex-col gap-2 pl-4">
                        <div className="w-full flex items-center gap-2">
                            <input type="checkbox" name="auto" id="auto" checked/>
                            <label htmlFor="auto" className="text-lg">Slide Length: Auto.</label>
                        </div>
                        <div className="w-full flex items-center gap-2">
                            <input type="checkbox" name="manual" id="manual" />
                            <label htmlFor="manual" className="text-lg">Slide Length: Manual.</label>
                        </div>
                        <div className="w-full flex items-center gap-2 hidden">
                            <label htmlFor="" className="text-lg">Length:</label>
                            <input type="number" name="length" id="length" />
                        </div>
                        <h1 className="italic text-primary-content/50">1 Per Second = 5 Seconds / 5 Seconds</h1>
                        <div className="w-full flex items-center gap-2">
                            <input type="checkbox" name="loopable" id="loopable" />
                            <label htmlFor="loopable" className="text-lg">Loopable.</label>
                        </div>
                    </div>
                </section>)}
            </section>
            <section className="w-full flex gap-2 items-center justify-center mb-4 p-4 sm:w-72">
                <button className="w-full btn btn-accent font-semibold text-lg">Process Video</button>
                <button className="hidden sm:block w-full btn btn-base-300 font-semibold text-lg">Back</button>
            </section>
        </main>
        )
    } else {
        return (
            <main className="w-screen h-screen flex flex-col items-center justify-center">
            <section className="*:text-neutral w-full flex justify-between items-center p-2 sm:hidden">
                <button className="btn btn-ghost" onClick={() => setEditOpened(false)}>
                    <ArrowLeft/>
                </button>
                <h1 className="text-xl font-bold w-full">Edit Slides Order.</h1>
            </section>
            <section className="w-full h-full flex flex-col gap-3 sm:items-center sm:justify-center sm:w-[30rem] sm:gap-4 sm:h-[35rem] overflow-auto">
                <h1 className="hidden sm:block font-bold text-3xl">Edit Slides Order.</h1>
                <ItemList items={imgItems} setItems={setImgItems}/>
            </section>
            <section className="w-full flex gap-2 items-center justify-center mb-4 p-4 sm:w-72">
                <button className="w-full btn btn-accent font-semibold text-lg">Save Changes.</button>
                <button className="hidden sm:block w-full btn btn-base-300 font-semibold text-lg" onClick={() => setEditOpened(false)}>Back</button>
            </section>
        </main>
        )
    }

}