import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

export default function ProductTabs({ product, fields }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <Tabs.Root 
      className="mt-16" 
      defaultValue="description"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Tabs.List className="flex border-b border-[var(--md-sys-color-outline)]">
        <Tabs.Trigger
          value="description"
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'description'
              ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]'
              : 'text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]'
          }`}
        >
          Description
        </Tabs.Trigger>
        
        {fields && Object.keys(fields).length > 0 && (
          <Tabs.Trigger
            value="specifications"
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'specifications'
                ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]'
                : 'text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]'
            }`}
          >
            Specifications
          </Tabs.Trigger>
        )}
        
        <Tabs.Trigger
          value="reviews"
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'reviews'
              ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]'
              : 'text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]'
          }`}
        >
          Reviews
        </Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content 
        value="description" 
        className="py-6 text-[var(--md-sys-color-on-surface)]"
      >
        {product.description ? (
          <div className="prose prose-lg max-w-none">
            {/* If description is HTML content, use dangerouslySetInnerHTML */}
            {product.description.includes('<') ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              // Otherwise render as paragraphs
              product.description.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index} className="mb-4">{paragraph}</p> : null
              ))
            )}
          </div>
        ) : (
          <p className="text-[var(--md-sys-color-on-surface-variant)]">
            No description available for this product.
          </p>
        )}
      </Tabs.Content>
      
      {fields && Object.keys(fields).length > 0 && (
        <Tabs.Content 
          value="specifications" 
          className="py-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(fields).map(([key, value]) => (
                  <tr key={key} className="border-b border-[var(--md-sys-color-outline-variant)]">
                    <th className="py-3 px-4 text-left w-1/3 text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface-variant)]">
                      {key}
                    </th>
                    <td className="py-3 px-4 text-[var(--md-sys-color-on-surface)]">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.Content>
      )}
      
      <Tabs.Content 
        value="reviews" 
        className="py-6"
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-6xl text-[var(--md-sys-color-on-surface-variant)] mb-4">
            <span className="mdi">star_rate</span>
          </div>
          <h3 className="text-xl font-medium mb-2 text-[var(--md-sys-color-on-surface)]">
            Be the first to review
          </h3>
          <p className="text-center text-[var(--md-sys-color-on-surface-variant)] mb-6">
            Share your thoughts on this product to help other shoppers make informed decisions.
          </p>
          <button className="px-6 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90">
            Write a Review
          </button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}