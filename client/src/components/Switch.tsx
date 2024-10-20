import React, { useState } from 'react';

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    text: string
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, text }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
        onChange(newChecked);
    }
    };

    return (
    <div className='w-full flex gap-2 items-center'>
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className='checkbox'
            />
        <label className="text-lg font-semibold">{text}</label>
    </div>
    );
};

export default Switch;
