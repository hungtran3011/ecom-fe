import { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export default function ProductGallery({ images = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    
    // Use placeholder if no images
    const displayImages = (images && images.length)
        ? images
        : ['/images/placeholder.png'];
    
    return (
        <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="border border-[var(--md-sys-color-outline)] rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center">
                <img 
                    src={displayImages[selectedImage]}
                    alt="Product"
                    className="max-w-full max-h-96 object-contain"
                />
            </div>
            
            {/* Thumbnail gallery */}
            {displayImages.length > 1 && (
                <ToggleGroup.Root
                    type="single"
                    value={String(selectedImage)}
                    onValueChange={(value) => setSelectedImage(Number(value))}
                    className="flex gap-2 overflow-x-auto pb-2"
                >
                    {displayImages.map((image, index) => (
                        <ToggleGroup.Item
                            key={index}
                            value={String(index)}
                            className={`border ${
                                selectedImage === index
                                    ? 'border-[var(--md-sys-color-primary)]'
                                    : 'border-[var(--md-sys-color-outline)]'
                            } rounded-md overflow-hidden w-20 h-20 flex-shrink-0 bg-white`}
                        >
                            <img 
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </ToggleGroup.Item>
                    ))}
                </ToggleGroup.Root>
            )}
        </div>
    );
}