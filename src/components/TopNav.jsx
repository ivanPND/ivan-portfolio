const resumeHref = '/assets/IvanTeixeira.1 .docx.pdf';

function TopNav() {
  return (
    <header className="top-nav">
      <nav>
        <a className="cursor-target" href="#projects">Projects</a>
        <a className="cursor-target" href="#about">About</a>
        <a className="cursor-target" href="#contact">Contact</a>
        <a className="cursor-target" href={resumeHref} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </nav>
    </header>
  );
}

export default TopNav;

