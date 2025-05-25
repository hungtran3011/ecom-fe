import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Product variant selector that handles multiple attribute formats from API
 */
export default function ProductVariantSelector({ 
  variants, 
  selectedVariant, 
  onVariantChange,
  disabled = false
}) {
  const [attributeGroups, setAttributeGroups] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Determine the format of attributes and extract data accordingly
  const extractAttributeInfo = (attr) => {
    // Format 1: { _id: "123", Color: "#808080" }
    if (Object.keys(attr).some(key => key !== '_id' && key !== 'name' && key !== 'type' && key !== 'value')) {
      const attrName = Object.keys(attr).find(key => key !== '_id');
      return {
        name: attrName,
        type: attrName, // Assume type is same as name
        value: attr[attrName]
      };
    }
    // Format 2: { name: "Color", type: "Color", value: "#58f572", _id: "123" }
    else if (attr.name && attr.type && 'value' in attr) {
      return {
        name: attr.name,
        type: attr.type,
        value: attr.value
      };
    }
    return null;
  };

  // Process variants to extract attribute groups
  useEffect(() => {
    if (!variants || variants.length === 0) return;
    
    const groups = {};
    
    // Process all variants to extract attributes
    variants.forEach(variant => {
      if (!variant.attributes || variant.attributes.length === 0) return;
      
      variant.attributes.forEach(attr => {
        const attrInfo = extractAttributeInfo(attr);
        if (!attrInfo) return;
        
        const { name, type, value } = attrInfo;
        
        if (!groups[name]) {
          groups[name] = {
            type,
            values: new Set()
          };
        }
        
        groups[name].values.add(value);
      });
    });
    
    // Convert sets to arrays
    Object.keys(groups).forEach(key => {
      groups[key].values = Array.from(groups[key].values);
    });
    
    setAttributeGroups(groups);
    
    // Initialize selected attributes from current variant
    if (selectedVariant && selectedVariant.attributes) {
      const selected = {};
      selectedVariant.attributes.forEach(attr => {
        const attrInfo = extractAttributeInfo(attr);
        if (attrInfo) {
          selected[attrInfo.name] = attrInfo.value;
        }
      });
      setSelectedAttributes(selected);
    }
  }, [variants, selectedVariant]);

  // Find matching variant based on selected attributes
  const findMatchingVariant = (attrs) => {
    return variants.find(variant => {
      if (!variant.attributes || variant.attributes.length === 0) return false;
      
      // Check if all selected attributes match this variant
      return Object.entries(attrs).every(([attrName, attrValue]) => {
        // Find matching attribute
        const matchingAttr = variant.attributes.find(attr => {
          const attrInfo = extractAttributeInfo(attr);
          return attrInfo && attrInfo.name === attrName;
        });
        
        if (!matchingAttr) return false;
        
        const attrInfo = extractAttributeInfo(matchingAttr);
        return attrInfo && attrInfo.value === attrValue;
      });
    });
  };

  // Handle attribute selection
  const handleAttributeChange = (name, value) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [name]: value
    };
    
    setSelectedAttributes(newSelectedAttributes);
    
    // Find matching variant and notify parent
    const matchingVariant = findMatchingVariant(newSelectedAttributes);
    if (matchingVariant) {
      onVariantChange(matchingVariant);
    }
  };

  // No variants, render nothing
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-4">
      {Object.entries(attributeGroups).map(([name, group]) => (
        <div key={name} className="mb-4">
          <h3 className="text-[var(--md-sys-color-on-surface)] font-medium mb-2">{name}:</h3>
          
          <div className="flex flex-wrap gap-2">
            {group.type === 'Color' ? (
              // Color selector
              <div className="flex flex-wrap gap-2">
                {group.values.map((colorValue, index) => {
                  const isSelected = selectedAttributes[name] === colorValue;
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleAttributeChange(name, colorValue)}
                      className={`w-8 h-8 rounded-full overflow-hidden ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[var(--md-sys-color-primary)]' 
                          : 'border border-[var(--md-sys-color-outline)]'
                      } flex items-center justify-center`}
                      title={colorValue}
                      aria-label={`Select color: ${colorValue}`}
                    >
                      <span 
                        className="block w-6 h-6 rounded-full"
                        style={{ backgroundColor: colorValue }}
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              // Size/other selector
              <div className="flex flex-wrap gap-2">
                {group.values.map((value, index) => {
                  const isSelected = selectedAttributes[name] === value;
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleAttributeChange(name, value)}
                      className={`px-3 py-1 rounded-md ${
                        isSelected
                          ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] border border-[var(--md-sys-color-primary)]'
                          : 'border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)]'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Stock information */}
      {selectedVariant && (
        <div className="text-sm mt-2">
          <span className="font-medium text-black dark:text-white">Availability: </span>
          {selectedVariant.stock > 0 ? (
            <span className="text-green-600">In Stock ({selectedVariant.stock} available)</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>
      )}
    </div>
  );
}

ProductVariantSelector.propTypes = {
  variants: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number,
      sku: PropTypes.string,
      attributes: PropTypes.arrayOf(PropTypes.object),
      isDefault: PropTypes.bool
    })
  ).isRequired,
  selectedVariant: PropTypes.object,
  onVariantChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};