import { useParams, useSearchParams } from 'react-router-dom';

export default function ProductCategoryPage() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const brand = searchParams.get('brand');
    const criteria = searchParams.get('criteria');
    
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4 text-[var(--md-sys-color-on-surface)]">Products: {category}</h1>
            {brand && <p className="mb-2 text-[var(--md-sys-color-on-surface-variant)]">Brand: {brand}</p>}
            {criteria && <p className="mb-2 text-[var(--md-sys-color-on-surface-variant)]">Criteria: {criteria}</p>}
            <p className="text-[var(--md-sys-color-on-surface)]">Browse products in the {category} category.</p>
            
            {/* Placeholder for product listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {Array(8).fill().map((_, i) => (
                    <div key={i} className="border border-[--md-sys-color-outline] rounded-lg p-4 bg-[--md-sys-color-surface]">
                        <div className="bg-[var(--md-sys-color-primary-container)] h-40 rounded-md mb-4"></div>
                        <h3 className="font-medium mb-1 text-[var(--md-sys-color-on-surface)]">Product {i + 1}</h3>
                        <p className="text-[var(--md-sys-color-primary)] mb-2">$199.99</p>
                        <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">Product description goes here</p>
                    </div>
                ))}
            </div>
        </div>
    );
}