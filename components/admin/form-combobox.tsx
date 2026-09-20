"use client";

import * as React from "react";
import { Combobox } from "@base-ui/react/combobox";
import {
  Check,
  ChevronDown,
  Plus,
} from "lucide-react";

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

const CREATE_PREFIX = "__create__";

export function FormCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  disabled = false,
}: FormComboboxProps) {
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] =
    React.useState("");

  const selectedOption = React.useMemo(() => {
    const existingOption = options.find(
      (option) => option.value === value,
    );

    if (existingOption) {
      return existingOption;
    }

    if (value?.trim()) {
      return {
        label: value,
        value,
      };
    }

    return null;
  }, [options, value]);

  const trimmedInput = inputValue.trim();

  const matchingOption = React.useMemo(
    () =>
      options.find(
        (option) =>
          option.label.toLowerCase() ===
          trimmedInput.toLowerCase(),
      ),
    [options, trimmedInput],
  );

  const canCreate =
    trimmedInput.length > 0 && !matchingOption;

  const createOption = React.useMemo<Option | null>(() => {
    if (!canCreate) {
      return null;
    }

    return {
      label: trimmedInput,
      value: `${CREATE_PREFIX}${trimmedInput}`,
    };
  }, [canCreate, trimmedInput]);

  const comboboxItems = React.useMemo(
    () =>
      createOption
        ? [...options, createOption]
        : options,
    [options, createOption],
  );

  return (
    <div
      ref={setPortalContainer}
      className="relative w-full"
    >
      <Combobox.Root
        items={comboboxItems}
        value={selectedOption}
        onValueChange={(newValue) => {
          if (!newValue) {
            onValueChange(null);
            setInputValue("");
            return;
          }

          if (
            newValue.value.startsWith(CREATE_PREFIX)
          ) {
            const customValue =
              newValue.value.slice(
                CREATE_PREFIX.length,
              );

            onValueChange(customValue);
            setInputValue(customValue);
            return;
          }

          onValueChange(newValue.label);
          setInputValue(newValue.label);
        }}
        isItemEqualToValue={(item, selected) =>
          item.value === selected.value
        }
        filter={(item, query) =>
          item.label
            .toLowerCase()
            .includes(query.toLowerCase())
        }
        itemToStringLabel={(item) =>
          item?.label ?? ""
        }
        itemToStringValue={(item) =>
          item?.label ?? ""
        }
        disabled={disabled}
      >
        <Combobox.InputGroup className="relative w-full">
          <Combobox.Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
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
            aria-label="Toggle options"
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
          >
            <ChevronDown className="size-4" />
          </Combobox.Trigger>
        </Combobox.InputGroup>

        <Combobox.Portal
          container={portalContainer}
        >
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
                {(option: Option) => {
                  const isCreateOption =
                    option.value.startsWith(
                      CREATE_PREFIX,
                    );

                  return (
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
                      <span className="flex items-center gap-2">
                        {isCreateOption && (
                          <Plus className="size-4" />
                        )}

                        <span>
                          {isCreateOption
                            ? `Add "${option.label}"`
                            : option.label}
                        </span>
                      </span>

                      {!isCreateOption && (
                        <Combobox.ItemIndicator>
                          <Check className="size-4" />
                        </Combobox.ItemIndicator>
                      )}
                    </Combobox.Item>
                  );
                }}
              </Combobox.List>

              <Combobox.Empty className="px-3 py-3 text-sm text-gray-500">
                No results found.
              </Combobox.Empty>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}