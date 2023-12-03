import Header from '../Header/Header';
import Routing from '../Routing/Routing';
import './Layout.css';

function Layout() {

  return (
    <div>

      <header>
        <Header />
      </header>
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
