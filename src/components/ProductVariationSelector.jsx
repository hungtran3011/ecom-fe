import { useEffect, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export default function ProductVariationSelector({ variations, selectedVariation, onVariationChange }) {
    // Group attributes by type
    const [attributeGroups, setAttributeGroups] = useState({});
    const [selectedAttributes, setSelectedAttributes] = useState({});
    
    // Process variations to extract attribute groups
    useEffect(() => {
        if (!variations || variations.length === 0) return;
        
        const groups = {};
        
        variations.forEach(variation => {
            if (!variation.attributes) return;
            
            variation.attributes.forEach(attr => {
                if (!groups[attr.name]) {
                    groups[attr.name] = {
                        type: attr.type,
                        values: new Set()
                    };
                }
                
                // Add value to set
                if (attr.type === 'Color') {
                    // Handle color objects
                    const colorValue = typeof attr.value === 'object' 
                        ? attr.value 
                        : { name: attr.value, hex: attr.value };
                        
                    groups[attr.name].values.add(JSON.stringify(colorValue));
                } else {
                    groups[attr.name].values.add(attr.value);
                }
            });
        });
        
        // Convert sets to arrays
        Object.keys(groups).forEach(key => {
            groups[key].values = Array.from(groups[key].values).map(val => {
                try {
                    return key === 'Color' ? JSON.parse(val) : val;
                } catch (e) {
                    console.error('Error parsing color value:', val, e);
                    return val;
                }
            });
        });
        
        setAttributeGroups(groups);
        
        // Initialize selected attributes from the default variation
        if (selectedVariation?.attributes) {
            const selected = {};
            selectedVariation.attributes.forEach(attr => {
                if (attr.type === 'Color') {
                    selected[attr.name] = typeof attr.value === 'object' 
                        ? JSON.stringify(attr.value)
                        : attr.value;
                } else {
                    selected[attr.name] = attr.value;
                }
            });
            setSelectedAttributes(selected);
        }
    }, [variations, selectedVariation]);
    
    // Handle attribute selection
    const handleAttributeChange = (name, value) => {
        const newSelectedAttributes = {
            ...selectedAttributes,
            [name]: value
        };
        
        setSelectedAttributes(newSelectedAttributes);
        
        // Find matching variation
        const matchingVariation = variations.find(variation => {
            if (!variation.attributes) return false;
            
            // Check if all selected attributes match this variation
            return Object.entries(newSelectedAttributes).every(([attrName, attrValue]) => {
                const matchingAttr = variation.attributes.find(attr => attr.name === attrName);
                if (!matchingAttr) return false;
                
                if (matchingAttr.type === 'Color') {
                    const colorValue = typeof matchingAttr.value === 'object'
                        ? JSON.stringify(matchingAttr.value)
                        : matchingAttr.value;
                        
                    return colorValue === attrValue;
                }
                
                return matchingAttr.value === attrValue;
            });
        });
        
        if (matchingVariation) {
            onVariationChange(matchingVariation);
        }
    };
    
    // Render nothing if no variations
    if (!variations || variations.length === 0) return null;
    
    return (
        <div className="space-y-4">
            {Object.entries(attributeGroups).map(([name, group]) => (
                <div key={name} className="mb-4">
                    <h3 className="text-[var(--md-sys-color-on-surface)] font-medium mb-2">{name}:</h3>
                    
                    <div className="flex flex-wrap gap-2">
                        {group.type === 'Color' ? (
                            // Color selector
                            <ToggleGroup.Root
                                type="single"
                                value={selectedAttributes[name]}
                                onValueChange={(value) => value && handleAttributeChange(name, value)}
                                className="flex flex-wrap gap-2"
                            >
                                {group.values.map((colorValue, index) => {
                                    const color = typeof colorValue === 'object' ? colorValue : { name: colorValue, hex: colorValue };
                                    const colorJson = JSON.stringify(color);
                                    
                                    return (
                                        <ToggleGroup.Item
                                            key={index}
                                            value={colorJson}
                                            className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
                                                selectedAttributes[name] === colorJson
                                                    ? 'border-[var(--md-sys-color-primary)]' 
                                                    : 'border-[var(--md-sys-color-outline)]'
                                            } flex items-center justify-center`}
                                            title={color.name}
                                        >
                                            <span 
                                                className="block w-6 h-6 rounded-full"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                        </ToggleGroup.Item>
                                    );
                                })}
                            </ToggleGroup.Root>
                        ) : (
                            // Size/other selector
                            group.values.map((value, index) => {
                                const isSelected = selectedAttributes[name] === value;
                                
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAttributeChange(name, value)}
                                        className={`px-3 py-1 rounded-full border ${
                                            isSelected
                                                ? 'border-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]'
                                                : 'border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)]'
                                        }`}
                                    >
                                        {value}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}