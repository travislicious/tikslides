import { ArrowLeft, Share, Settings2, ListCheck, ArrowRight } from "lucide-react"
import { useEffect, useState } from 'react';
import { ItemList } from "../components/List";
import Switch from "../components/Switch";
import { useGetData } from "../utils/api";

type ListItem = {
    id: number;
    url: string;
};

const initialItems: ListItem[] = [];


export default function DownloadPage() {
    const [imgItems, setImgItems] = useState<ListItem[]>(initialItems);
    const [editOpened, setEditOpened] = useState(false)
    const [optionsOpened, setOptionOpened] = useState(false)
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const [length, setLength] = useState("1")
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loopable, setLoopable] = useState(false)
    const [editedList, setEditedList] = useState<ListItem[]>([])
    const url = window.sessionStorage.getItem('url')
    const { data, isLoading } = useGetData(url!)
    const [musicUrl, setMusicUrl] = useState(data?.music_url)
    const [duration, setDuration] = useState(0)
    
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    }
    
    const getAudioDuration = (url: string) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            setDuration(Math.floor(audio.duration))
        });
    };

    useEffect(() => {
        if (data) {
            getAudioDuration(data!.music_url)
            const slides = data?.slides_url
            slides.map((slide, idx) => {
                setEditedList((prev) => [...prev, { id: idx, url: slide }])
                setImgItems((prev) => [...prev, { id: idx, url: slide }])
            })
        }
    }, [data])

    function closeOrder() {
        setEditedList(imgItems)
        setEditOpened(false)
    }

    function moveLeft() {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    function moveRight() {
        if (currentSlide < imgItems.length - 1) {
            setCurrentSlide(currentSlide + 1)
        }
    }

    if (isLoading) {
        return (<main className="w-screen h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></main>)
    }

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
                    <h1 className="w-full text-4xl truncate"><span className="font-bold">{data?.video_author}'s</span> video.</h1>
                    <h3 className="mt-1 text-xl font-semibold w-full truncate">{data?.video_description}</h3>
                </section>)}
                { /* Carousel */ }
                { !optionsOpened && (<img src={imgItems[currentSlide]?.url} alt={`Slide ${currentSlide + 1}`} className="w-80 h-80 sm:h-96 sm:w-96 rounded-lg object-cover"/>)}
                <section className={`w-full flex sm:w-96 items-center ${ !optionsOpened ? "justify-between" : "justify-start"} gap-2`}>
                    <button className="btn btn-square" onClick={() => setOptionOpened(!optionsOpened)}>
                        <Settings2/>
                    </button>
                    { !optionsOpened && (<div className="flex gap-4 items-center justify-center bg-base-200 rounded-lg">
                        <button className="btn btn-ghost" onClick={moveLeft}>
                            <ArrowLeft/>
                        </button>
                        <h1 className="text-2xl font-bold">{currentSlide + 1}/{imgItems.length}</h1>
                        <button className="btn btn-ghost" onClick={moveRight}>
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
                        <Switch checked={isSwitchOn} onChange={handleSwitchChange} text={isSwitchOn ? "Slide Length: Manual." : "Slide Length: Auto."}/>
                        { isSwitchOn && (<div className="w-full flex items-center gap-4">
                            <label htmlFor="" className="text-lg font-semibold">Length:</label>
                            <input type="number" name="length" id="length" value={length} onChange={(e) => setLength(e.target.value)} placeholder="0" className="input input-bordered w-full"/>
                        </div>)}
                        <h1 className="italic text-primary-content/50">{length} Per Second = {imgItems?.length * parseInt(length)} Seconds / {duration} Seconds</h1>
                        <div className="w-full flex items-center gap-2">
                            <input type="checkbox" name="loopable" id="loopable" className="checkbox"/>
                            <label htmlFor="loopable" className="text-lg font-semibold">Loopable.</label>
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
                <ItemList items={editedList} setItems={setEditedList}/>
            </section>
            <section className="w-full flex gap-2 items-center justify-center mb-4 p-4 sm:w-72">
                <button className="w-full btn btn-accent font-semibold text-lg" onClick={() => setEditOpened(false)}>Save Changes.</button>
                <button className="hidden sm:block w-full btn btn-base-300 font-semibold text-lg" onClick={closeOrder}>Back</button>
            </section>
        </main>
        )
    }

}