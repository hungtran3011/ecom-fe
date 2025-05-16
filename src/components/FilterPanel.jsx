import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Checkbox from '@radix-ui/react-checkbox';
// import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@radix-ui/react-icons';

export default function FilterPanel({ filters, onFilterChange, categoryFields = [] }) {
    const [expanded, setExpanded] = useState({
        price: true,
        stock: true,
        fields: true
    });
    
    const handlePriceChange = (field, value) => {
        onFilterChange({ [field]: value });
    };
    
    const handleStockChange = (checked) => {
        onFilterChange({ inStock: checked });
    };
    
    const handleFieldChange = (fieldName, value) => {
        onFilterChange({
            fields: {
                ...(filters.fields || {}),
                ...filters.fields,
                [fieldName]: value
            }
        });
    };
    
    const toggleSection = (section, open) => {
        setExpanded((prev) => ({
            ...prev,
            [section]: open,
        }));
    };
    
    return (
        <div className="bg-[var(--md-sys-color-surface-container)] p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">Filters</h2>
            
            {/* Price filter */}
            <div className="mb-6 border-b border-[var(--md-sys-color-outline-variant)] pb-6">
                <Collapsible.Root open={expanded.price} onOpenChange={(open) => toggleSection('price', open)}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">Price</h3>
                        <Collapsible.Trigger asChild>
                            <button className="text-[var(--md-sys-color-on-surface-variant)]">
                                {expanded.price ? <span className="mdi">keyboard_arrow_up</span> : <span className="mdi">keyboard_arrow_down</span>}
                            </button>
                        </Collapsible.Trigger>
                    </div>
                    
                    <Collapsible.Content>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                                    className="w-full p-2 border border-[var(--md-sys-color-outline)] rounded bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                                />
                                <span className="text-[var(--md-sys-color-on-surface-variant)]">to</span>
                                <input
                                    type="text"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                                    className="w-full p-2 border border-[var(--md-sys-color-outline)] rounded bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                                />
                            </div>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
            
            {/* Stock filter */}
            <div className="mb-6 border-b border-[var(--md-sys-color-outline-variant)] pb-6">
                <Collapsible.Root open={expanded.stock} onOpenChange={(open) => toggleSection('stock', open)}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">Availability</h3>
                        <Collapsible.Trigger asChild>
                            <button className="text-[var(--md-sys-color-on-surface-variant)]">
                                {expanded.stock ? <span className="mdi">keyboard_arrow_up</span> : <span className="mdi">keyboard_arrow_down</span>}
                            </button>
                        </Collapsible.Trigger>
                    </div>
                    
                    <Collapsible.Content>
                        <div className="flex items-center gap-2">
                            <Checkbox.Root
                                id="inStock"
                                checked={filters.inStock}
                                onCheckedChange={(checked) => handleStockChange(!!checked)}
                                className="rounded-sm text-[var(--md-sys-color-primary)] focus:ring-[var(--md-sys-color-primary)]"
                            >
                                <Checkbox.Indicator>
                                    <span className="mdi">check</span>
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label htmlFor="inStock" className="text-[var(--md-sys-color-on-surface)]">
                                In Stock Only
                            </label>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
            
            {/* Dynamic category fields */}
            {categoryFields.length > 0 && (
                <div className="mb-6">
                    <Collapsible.Root open={expanded.fields} onOpenChange={(open) => toggleSection('fields', open)}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">Specifications</h3>
                            <Collapsible.Trigger asChild>
                                <button className="text-[var(--md-sys-color-on-surface-variant)]">
                                    {expanded.fields ? <span className="mdi">keyboard_arrow_up</span> : <span className='mdi'>keyboard_arrow_down</span>}
                                </button>
                            </Collapsible.Trigger>
                        </div>
                        
                        <Collapsible.Content>
                            <div className="space-y-4">
                                {categoryFields.map((field) => (
                                    <div key={field.name} className="mb-4">
                                        <label className="block mb-2 text-[var(--md-sys-color-on-surface)]">
                                            {field.name}
                                        </label>
                                        
                                        {field.type === 'String' && (
                                            <input
                                                type="text"
                                                value={filters.fields[field.name] || ''}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                className="w-full p-2 border border-[var(--md-sys-color-outline)] rounded bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                                            />
                                        )}
                                        
                                        {field.type === 'Number' && (
                                            <input
                                                type="number"
                                                value={filters.fields[field.name] || ''}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                className="w-full p-2 border border-[var(--md-sys-color-outline)] rounded bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                                            />
                                        )}
                                        
                                        {field.type === 'Boolean' && (
                                            <div className="flex items-center gap-2">
                                                <Checkbox.Root
                                                    id={`field-${field.name}`}
                                                    checked={!!filters.fields[field.name]}
                                                    onCheckedChange={(checked) => handleFieldChange(field.name, !!checked)}
                                                    className="rounded-sm text-[var(--md-sys-color-primary)] focus:ring-[var(--md-sys-color-primary)]"
                                                >
                                                    <Checkbox.Indicator>
                                                        <span className="mdi">check</span>
                                                    </Checkbox.Indicator>
                                                </Checkbox.Root>
                                                <label 
                                                    htmlFor={`field-${field.name}`}
                                                    className="text-[var(--md-sys-color-on-surface)]"
                                                >
                                                    Yes
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </div>
            )}
            
            <button
                onClick={() => {
                    onFilterChange({
                        minPrice: '',
                        maxPrice: '',
                        inStock: false,
                        fields: {}
                    });
                }}
                className="w-full py-2 bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)] rounded hover:bg-opacity-80"
            >
                Clear All Filters
            </button>
        </div>
    );
}