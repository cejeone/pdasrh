import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown } from "lucide-react";

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder,
}: {
  options: { value: string; label: string }[];
  value: string[];
  onValueChange: (val: string[]) => void;
  placeholder?: string;
}) {
  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onValueChange(value.filter((v) => v !== val));
    } else {
      onValueChange([...value, val]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <span>{value.length > 0 ? `${value.length} kolom` : placeholder || "Pilih kolom"}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-2">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            <Checkbox checked={value.includes(opt.value)} onCheckedChange={() => toggleValue(opt.value)} />
            <label className="text-sm p-1">{opt.label}</label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
