export default function SiteHeader({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <header className="site-shell site-header" aria-label="Main navigation">
      <a className="brand" href="/" aria-label="ShardUp home">
        ShardUp
      </a>
      <nav className="nav-links">
        <a href="/#about">About</a>
        <a href="/#community">Community</a>
        {children ?? <a href="/join">Join</a>}
      </nav>
    </header>
  );
}
