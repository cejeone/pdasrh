// InputField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export default function InputField({ label, value, onChange, error, placeholder, type = "text", disabled = false }: InputFieldProps) {
  const computedPlaceholder = placeholder ?? `Masukkan ${label}`;

  return (
    <div>
      <Label className="text-secondary-green mb-2 font-bold">{label}</Label>
      <Input value={value} onChange={onChange} type={type} disabled={disabled} className={`border-border ${disabled ? "bg-[#F0F0F0]" : ""}`} placeholder={computedPlaceholder} />
      {error && <p className="text-base-destructive text-sm">{error}</p>}
    </div>
  );
}
