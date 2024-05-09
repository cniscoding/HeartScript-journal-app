import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface JournalSortControlsProps {
  onSortByDate: () => void;
  onSortByCreationDate: () => void;
  onSortAscending: () => void;
  onSortDescending: () => void;
}

const JournalSortControls: React.FC<JournalSortControlsProps> = ({
  onSortByDate,
  onSortByCreationDate,
  onSortAscending,
  onSortDescending,
}) => {
  return (
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <button className="w-full text-center px-1 py-1 hover:bg-gray-100" onClick={onSortByDate}>Sort by Date</button>
          <button className="w-full text-center px-1 py-1 hover:bg-gray-100" onClick={onSortByCreationDate}>Sort by Creation Date</button>
          <button className="w-full text-center px-1 py-1 hover:bg-gray-100" onClick={onSortAscending}>Ascending Order</button>
          <button className="w-full text-center px-1 py-1 hover:bg-gray-100" onClick={onSortDescending}>Descending Order</button>
        </PopoverContent>
      </Popover>
  );
};

export default JournalSortControls;