import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

/**
 * A utility function that combines clsx and twMerge for handling Tailwind CSS classes
 * - Uses clsx for conditional class joining
 * - Uses twMerge to properly handle Tailwind class conflicts
 * 
 * @param {...any} inputs - The classes to be joined
 * @returns {string} - A properly merged string of Tailwind class names
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
