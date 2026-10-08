"use client";

import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export type SelectOption = { value: string; label: string };

type Props = {
  /** Also the trigger's id, so the field's `<label htmlFor>` names it. */
  id: string;
  name?: string;
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly SelectOption[];
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

/**
 * Themed replacement for a native <select>. The native popup is drawn by the OS and ignores
 * the site's tokens; this one is a Radix listbox (keyboard nav, typeahead, ARIA, collision
 * handling) styled like the nav's locale and theme menus, so it follows every theme.
 */
export function SelectField({ id, name, value, onValueChange, onBlur, options, invalid, describedBy, className }: Props) {
  return (
    <Select.Root name={name} value={value} onValueChange={onValueChange} onOpenChange={(open) => !open && onBlur?.()}>
      <Select.Trigger
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "group flex w-full items-center justify-between gap-3 rounded-field bg-obsidian/60 px-4 py-3.5 text-left text-cream hairline outline-none",
          "transition-shadow duration-500 ease-silk focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-gold)] data-[state=open]:shadow-[inset_0_0_0_1.5px_var(--color-gold)]",
          "aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_var(--color-danger)]",
          className,
        )}
      >
        <Select.Value />
        <Select.Icon asChild>
          <CaretDown
            size={14}
            weight="light"
            className="shrink-0 text-smoke transition-transform duration-500 ease-silk group-data-[state=open]:rotate-180"
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          collisionPadding={16}
          // Lenis would otherwise swallow wheel events meant for the list.
          data-lenis-prevent
          className={cn(
            "glass z-50 max-h-[min(20rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] min-w-40",
            "origin-[var(--radix-select-content-transform-origin)] overflow-hidden rounded-menu bg-char/95 inner-glow backdrop-blur-2xl animate-menu-in",
          )}
        >
          <Select.ScrollUpButton className="flex h-7 items-center justify-center text-smoke">
            <CaretUp size={12} weight="light" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1.5">
            {options.map((o) => (
              <Select.Item
                key={o.value}
                value={o.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center justify-between gap-3 rounded-menu-item px-3.5 py-2.5 text-sm text-smoke outline-none",
                  "transition-colors duration-300 ease-silk data-[highlighted]:bg-cream/[0.07] data-[highlighted]:text-cream data-[state=checked]:text-cream",
                )}
              >
                <Select.ItemText>{o.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={14} weight="light" className="text-gold-bright" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-7 items-center justify-center text-smoke">
            <CaretDown size={12} weight="light" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
