import "./Header.css";

function Headercomponent() {
    return (
        <div>
            <header>
                <nav className="k">
                    <div className="header-bg">
                        <a href="https://javaguides.net" className="navbar-brand" style={{ fontSize: "20px" }}>
                            Employee Management Application
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Headercomponent;
