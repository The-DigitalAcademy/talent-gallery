"use client";

import * as React from "react";
import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronDown } from "lucide-react";

export type Option = {
  label: string;
  value: string;
};

type FormComboboxProps = {
  options: Option[];
  value?: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function FormCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  disabled = false,
}: FormComboboxProps) {
  // Keep a stable object reference for the selected option so Base UI
  // doesn't see a "new" value (and reset the input text) on every render.
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  return (
    <Combobox.Root
      items={options}
      value={selectedOption}
      onValueChange={(newValue) => {
        onValueChange(newValue?.value ?? null);
      }}
      isItemEqualToValue={(item, selected) =>
        item.value === selected.value
      }
      filter={(item, query) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      }
      itemToStringLabel={(item) => item?.label ?? ""}
      itemToStringValue={(item) => item?.value ?? ""}
      disabled={disabled}
    >
      <Combobox.InputGroup className="relative w-full">
        <Combobox.Input
          placeholder={placeholder}
          className="
            h-9
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-3
            pr-9
            text-sm
            outline-none
            placeholder:text-gray-500
            focus:border-gray-500
            disabled:cursor-not-allowed
            disabled:bg-gray-100
            disabled:text-gray-400
          "
        />

        <Combobox.Trigger
          type="button"
          className="
            absolute
            right-0
            top-0
            flex
            h-9
            w-9
            items-center
            justify-center
            text-gray-500
            outline-none
          "
          aria-label="Toggle options"
        >
          <ChevronDown className="size-4" />
        </Combobox.Trigger>
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner
          side="bottom"
          align="start"
          sideOffset={4}
          className="z-[1000]"
        >
          <Combobox.Popup
            className="
              w-[var(--anchor-width)]
              overflow-hidden
              rounded-lg
              border
              border-gray-200
              bg-white
              shadow-lg
            "
          >
            <Combobox.List className="max-h-60 overflow-y-auto p-1">
              {(option: Option) => (
                <Combobox.Item
                  key={option.value}
                  value={option}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-md
                    px-3
                    py-2
                    text-sm
                    text-gray-700
                    outline-none
                    data-[highlighted]:bg-gray-100
                  "
                >
                  <span>{option.label}</span>

                  <Combobox.ItemIndicator>
                    <Check className="size-4" />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </Combobox.List>

            <Combobox.Empty className="px-3 py-3 text-sm text-gray-500">
              No results found.
            </Combobox.Empty>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}