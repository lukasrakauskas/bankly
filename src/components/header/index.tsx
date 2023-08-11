import "./index.css";

export const Header = () => (
  <header>
    <div className="content">
      <a href="https://www.bankly.com/" target="_blank" rel="noreferrer">
        <img
          src="/bankly.svg"
          className="logo"
          alt="Bankly logo"
          width={112}
          height={30}
        />
      </a>
    </div>
  </header>
);
