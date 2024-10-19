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

    return (
        <main className="w-screen h-screen flex flex-col p-2">
            <section className="w-full flex items-center">
                <button>
                    <ArrowLeft />
                </button>
                    <h1>Edit Slides Order.</h1>
            </section>
            <section>
                <ItemList items={imgItems} setItems={setImgItems}/>
            </section>
            <section className="w-full flex items-center justify-center">
                <button className="w-full btn btn-accent">Save Changes.</button>
                <button className="w-full btn btn-accent">Back</button>
            </section>
        </main>
    )
}