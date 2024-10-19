import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

type ListItem = {
    id: number;
    url: string;
};

// ListItemComponent: Handles rendering of each list item with arrow buttons
export const ListItemComponent: React.FC<{
    item: ListItem;
    index: number;
    totalItems: number;
    onMoveUp: () => void;
    onMoveDown: () => void;
}> = ({ item, index, totalItems, onMoveUp, onMoveDown }) => {
    return (
    <li className='w-full bg-base-300 rounded flex items-center p-2 gap-4'>
        <img src={item.url} alt="Image." className='size-16 rounded object-cover' />
        <h1 className='text-2xl font-bold'>{index + 1}</h1>
        <div className='w-full flex justify-end items-center gap-2'>
        <button
            onClick={onMoveUp}
            disabled={index === 0}
            className='btn btn-ghost'
        >
            <ArrowUp/>
        </button>
        <button
            onClick={onMoveDown}
            disabled={index === totalItems - 1}
            className='btn btn-ghost'
        >
            <ArrowDown/>
        </button>
        </div>
    </li>
    );
};

