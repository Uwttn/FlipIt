import Auth from "../../utils/auth";
import { Link } from '@chakra-ui/react'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className='flex-row align-center'>
      <div className='container-nav flex-row justify-space-between-lg justify-center align-center'>
        <div>
          <Link className='text-light' to='/'>
          <img className="logo" src="FlipIt Logo.png" alt="FlipIt Logo" />
          </Link>
        </div>
        <div className="menu">
          {Auth.loggedIn() ? (
            <>
        <Link className='header-link' href='/create'>
                Create Deck
              </Link>
              <Link className='header-link' href='/decks'>
                My Decks
              </Link>
              <Link className='header-link' href='/study'>
                Study Mode
              </Link>
              <button className='' onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className='header-link' href='/create'>
                Create Deck
              </Link>
              <Link className='header-link' href='/decks'>
                My Decks
              </Link>
              <Link className='header-link' href='/study'>
                Study Mode
              </Link>
              <Link className='header-link' href='/login'>
                Login
              </Link>
              <Link className='header-link' href='/signup'>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
