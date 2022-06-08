export default function Header() {
  return (
    <header className="bg-white">
      <nav className="navbar navbar-expand-lg navbar-light container-fluid px-3">
        <span className="navbar-brand me-5">ООО «Дельта Юг»</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto d-flex">
            <ul className="navbar-nav d-flex flex-row gap-4">
              <li className="nav-item">
                <a className="nav-link active text-primary" href="#">
                  Доска
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Диаграмма{" "}
                  <span className="ms-3 badge rounded-pill bg-primary">
                    В разработке
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Поиск"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Искать
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
