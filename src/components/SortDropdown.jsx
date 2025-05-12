import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function SortDropdown({ value, onChange, options }) {
  const currentOption = options.find(option => option.value === value) || options[0];
  
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="px-3 py-2 flex items-center gap-2 bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-high)] transition-colors">
          <span>Sort by: {currentOption.label}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[180px] bg-[var(--md-sys-color-surface)] shadow-lg border border-[var(--md-sys-color-outline)] rounded-lg overflow-hidden z-10">
          {options.map((option) => (
            <DropdownMenu.Item 
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                option.value === value 
                  ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]' 
                  : 'text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container)]'
              }`}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}