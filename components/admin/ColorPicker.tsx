import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState } from "react";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center mb-2 border-[1px] border-gray-400 p-1 rounded-md max-w-[200px]">
        <p className="">#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;