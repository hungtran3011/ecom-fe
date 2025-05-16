export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="flex items-center justify-center p-4 bg-[var(--md-sys-color-surface-variant)]">
      <p className="text-[var(--md-sys-color-on-surface-variant)]">
        © {currentYear} Your Company. All rights reserved.
      </p>
    </footer>
  );
}