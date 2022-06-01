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
  ({ options, defaultOption, onChange, ...props }, ref) => {
    return (
      <select
        onChange={onChange}
        defaultValue={props.multiple?[]:0}
        multiple={props.multiple}
        ref={ref}
      >
        <option value={0} disabled key={0}>
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
