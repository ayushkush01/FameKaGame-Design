"use client";

import { ListBox, Select } from "@heroui/react";

type SelectOption = {
  label: string;
  value: string;
};

export function AppSelect({
  ariaLabel,
  className = "",
  fullWidth,
  onChange,
  options,
  value,
}: {
  ariaLabel: string;
  className?: string;
  fullWidth?: boolean;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
}) {
  return (
    <Select
      aria-label={ariaLabel}
      className={className}
      fullWidth={fullWidth}
      onSelectionChange={(key) => {
        if (key !== null) {
          onChange(String(key));
        }
      }}
      selectedKey={value}
      variant="secondary"
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox items={options}>
          {(option) => (
            <ListBox.Item id={option.value} textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
