export default function Pagination({ currentPage, totalPages, onPageChange, isDisabled }) {
    // Calculate page range
    const getPageRange = () => {
        const range = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        // Ensure we have up to 5 pages when possible
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(5, totalPages);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, totalPages - 4);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
        
        return range;
    };
    
    const pageRange = getPageRange();
    
    return (
        <div className="flex items-center gap-1">
            {/* First page */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1 || isDisabled}
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? 'text-[var(--md-sys-color-on-surface-variant)] cursor-not-allowed'
                        : 'text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]'
                }`}
            >
                &laquo;
            </button>
            
            {/* Previous page */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isDisabled}
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? 'text-[var(--md-sys-color-on-surface-variant)] cursor-not-allowed'
                        : 'text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]'
                }`}
            >
                &lsaquo;
            </button>
            
            {/* First page indicator */}
            {pageRange[0] > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={isDisabled}
                        className="px-3 py-1 rounded text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]"
                    >
                        1
                    </button>
                    {pageRange[0] > 2 && (
                        <span className="px-2 text-[var(--md-sys-color-on-surface-variant)]">...</span>
                    )}
                </>
            )}
            
            {/* Page numbers */}
            {pageRange.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={isDisabled}
                    className={`px-3 py-1 rounded ${
                        page === currentPage
                            ? 'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]'
                            : 'text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]'
                    }`}
                >
                    {page}
                </button>
            ))}
            
            {/* Last page indicator */}
            {pageRange[pageRange.length - 1] < totalPages && (
                <>
                    {pageRange[pageRange.length - 1] < totalPages - 1 && (
                        <span className="px-2 text-[var(--md-sys-color-on-surface-variant)]">...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={isDisabled}
                        className="px-3 py-1 rounded text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]"
                    >
                        {totalPages}
                    </button>
                </>
            )}
            
            {/* Next page */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isDisabled}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? 'text-[var(--md-sys-color-on-surface-variant)] cursor-not-allowed'
                        : 'text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]'
                }`}
            >
                &rsaquo;
            </button>
            
            {/* Last page */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages || isDisabled}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? 'text-[var(--md-sys-color-on-surface-variant)] cursor-not-allowed'
                        : 'text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]'
                }`}
            >
                &raquo;
            </button>
        </div>
    );
}