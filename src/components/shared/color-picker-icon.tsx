import { Check } from 'lucide-react';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { colors } from '@/functions/generateRandomColors';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useLocale } from 'next-intl';

interface ColorPickerIconProps {
  color: string;
  type?: 'icon' | 'button';
  onColorSelected?: (color: string) => void;
}

const ColorPickerIcon = ({
  color,
  type = 'icon',
  onColorSelected,
}: ColorPickerIconProps) => {
  const lang = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger
        render={
          type === 'button' ? (
            <Button
              type="button"
              variant="outline"
              className={cn(
                'flex items-center justify-center gap-2 rounded-md transition-all duration-200 hover:opacity-90 px-1',
              )}
            >
              <div
                className="size-6 rounded-md"
                style={{ background: color }}
              />
              {lang === 'es' ? 'Seleccionar color' : 'Select color'}
            </Button>
          ) : (
            <button
              type="button"
              className="size-8 rounded-md transition-all duration-200 hover:opacity-90"
              style={{ background: color }}
            />
          )
        }
      />
      <PopoverContent className="p-2">
        <div className="grid grid-cols-6 gap-2 p-2">
          {colors.map((item) => (
            <button
              type="button"
              key={item}
              className={cn(
                'flex size-10 cursor-pointer items-center justify-center rounded-md hover:opacity-90',
                item === color && 'ring-primary shadow-lg ring-4',
              )}
              style={{ background: item }}
              onClick={() => {
                setOpen(false);
                onColorSelected?.(item);
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setOpen(false);
                  onColorSelected?.(item);
                }
              }}
            >
              {item === color && (
                <Check className="size-6 text-white" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPickerIcon;
