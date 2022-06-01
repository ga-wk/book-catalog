import React, {
  DetailedHTMLProps,
  FunctionComponent,
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

const Select: FunctionComponent<ISelect> = ({
  options,
  defaultOption,
  onChange,
}) => {
  return (
    <select onChange={onChange} defaultValue={0}>
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
};

export default Select;
