"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectFieldBaseProps = {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  emptyText?: string;
  searchPlaceholder?: string;
};

type SingleSelectFieldProps = SelectFieldBaseProps & {
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
};

type MultiSelectFieldProps = SelectFieldBaseProps & {
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type SelectFieldProps = SingleSelectFieldProps | MultiSelectFieldProps;

export function SelectField(props: SelectFieldProps) {
  const anchor = useComboboxAnchor();
  const {
    options,
    placeholder = "Select an option",
    className,
    disabled = false,
    emptyText = "No options found.",
    searchPlaceholder = "Search options...",
  } = props;

  if (props.multiple) {
    const values = props.value ?? [];

    return (
      <Combobox
        multiple
        autoHighlight
        items={options.map((option) => option.value)}
        value={values}
        onValueChange={props.onValueChange}
        disabled={disabled}
      >
        <ComboboxChips ref={anchor} className={cn("w-full", className)}>
          <ComboboxValue>
            {(selectedValues) => (
              <>
                {selectedValues.map((selectedValue: string) => {
                  const option = options.find((item) => item.value === selectedValue);
                  return <ComboboxChip key={selectedValue}>{option?.label ?? selectedValue}</ComboboxChip>;
                })}
                <ComboboxChipsInput placeholder={placeholder} />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxInput placeholder={searchPlaceholder} />
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {(value) => {
              const option = options.find((item) => item.value === value);
              return (
                <ComboboxItem key={value} value={value} disabled={option?.disabled}>
                  {option?.label ?? value}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  }

  return (
    <Select value={props.value} onValueChange={props.onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">{emptyText}</div>
          ) : (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
