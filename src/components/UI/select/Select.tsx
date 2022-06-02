import React, {
  DetailedHTMLProps,
  forwardRef,
  SelectHTMLAttributes,
} from "react";

interface ISelect
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { title: string; value: string }[];
  defaultOption: string;
}

const Select = forwardRef<HTMLSelectElement, ISelect>(
  ({ options, defaultOption, onChange, disabled=false, ...props }, ref) => {
    return (
      <select
        onChange={onChange}
        defaultValue={props.multiple?[]:0}
        multiple={props.multiple}
        disabled={disabled}
        ref={ref}
      >
        <option value={defaultOption} disabled key={0}>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
