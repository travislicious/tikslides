import { ArrowLeft, Share, Settings2, ArrowDown, ArrowUp, ListCheck, ArrowRight } from "lucide-react"

export default function DownloadPage() {
    return (
        <main className="w-screen h-screen flex flex-col items-center justify-center">
            <section className="*:text-neutral w-full flex justify-between items-center p-4 sm:hidden">
                <ArrowLeft/>
                <h1 className="text-xl font-bold">Download.</h1>
                <Share/>
            </section>
            <section className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
                <section className="w-full">
                    <h1 className="w-full text-4xl"><span className="font-bold">Travis's</span> video.</h1>
                    <h3 className="mt-1 text-xl font-semibold">Description.</h3>
                </section>
                { /* Carousel */ }
                <div className="w-full h-96 sm:w-96 bg-primary rounded-lg"></div>
                <section className="w-full flex sm:w-96 items-center justify-between">
                    <button className="btn btn-square">
                        <Settings2/>
                    </button>
                    <div className="sm:w-96 flex gap-4 items-center justify-center bg-base-200 p-2 rounded-lg">
                        <ArrowLeft/>
                        <h1 className="text-2xl font-bold">1/5</h1>
                        <ArrowRight/>
                    </div>
                    <button className="btn btn-square">
                        <ListCheck/>
                    </button>
                </section>
                <section className="hidden">
                    <h1>Options.</h1>
                    <div>
                        <h1>Slide Length.</h1>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Auto.</label>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Manual.</label>
                        <div>
                            <label htmlFor="">Length:</label>
                            <input type="number" name="" id="" />
                        </div>
                        <h1>1 Per Second = 5 Seconds / 5 Seconds</h1>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Loopable.</label>
                    </div>
                </section>
            </section>
            <section className="w-full flex gap-2 items-center justify-center mb-4 p-4 sm:w-72">
                <button className="w-full btn btn-accent font-semibold text-lg">Process Video</button>
                <button className="hidden sm:block w-full btn btn-base-300 font-semibold text-lg">Back</button>
            </section>
        </main>
    )
}