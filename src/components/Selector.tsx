import { SyntheticEvent } from "react";

interface SelectorProps {
  onChange: (option: SyntheticEvent<HTMLSelectElement, Event>) => void;
  options: string[];
}

function Selector({ options, onChange }: SelectorProps) {
  return (
    <select
      onChange={onChange}
      style={{ padding: "10px", borderRadius: "10px" }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Selector;
