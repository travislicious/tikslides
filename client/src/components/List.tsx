import React from 'react';
import { ListItemComponent } from './ListItem';

type ListItem = {
    id: number;
    url: string;
};

// ItemList: Handles the rendering of the list and swapping logic
export const ItemList: React.FC<{ items: ListItem[]; setItems: React.Dispatch<React.SetStateAction<ListItem[]>> }> = ({ items, setItems }) => {
    const swapItems = (index1: number, index2: number) => {
    const newItems = [...items];
    [newItems[index1], newItems[index2]] = [newItems[index2], newItems[index1]];
    setItems(newItems);
    };

    const moveUp = (index: number) => {
    if (index > 0) {
        swapItems(index, index - 1);
    }
    };

    const moveDown = (index: number) => {
    if (index < items.length - 1) {
        swapItems(index, index + 1);
    }
    };

    return (
    <ul className='w-full p-2 flex flex-col gap-3'>
        {items.map((item, index) => (
        <ListItemComponent
            key={item.id}
            item={item}
            index={index}
            totalItems={items.length}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
        />
        ))}
    </ul>
    );
};

