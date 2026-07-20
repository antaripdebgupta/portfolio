export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-maxw text-muted mx-auto flex w-full flex-wrap justify-between gap-2.5 px-4 py-8 pb-15 font-mono text-[12.5px] sm:px-8 md:px-14 xl:px-60 2xl:px-80">
      <span>© {currentYear} Antarip Debgupta</span>
      <span>Built with semantic HTML — Next.js & Tailwind CSS</span>
    </footer>
  );
}
