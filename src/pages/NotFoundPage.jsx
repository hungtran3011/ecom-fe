import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="container mx-auto py-8 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Page not found</p>
            <Link to="/" className="bg-[--md-sys-color-primary] text-[--md-sys-color-on-primary] px-4 py-2 rounded">
                Go Home
            </Link>
        </div>
    );
}