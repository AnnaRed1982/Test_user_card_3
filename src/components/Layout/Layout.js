import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div>
      <header>
        <nav className={css.navbar}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? css.active : css.searchbarLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tweets"
            className={({ isActive }) =>
              isActive ? css.active : css.searchbarLink
            }
          >
            SocialNetwork
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer></footer>
    </div>
  );
};
