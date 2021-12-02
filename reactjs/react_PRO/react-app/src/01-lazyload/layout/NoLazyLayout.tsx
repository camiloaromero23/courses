import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { About, Home, Users } from '../pages';

export const NoLazyLayout = () => {
  return (
    <div>
      <h1>No LazyLoad Layout</h1>

      <ul>
        <li>
          <NavLink to="home">Home</NavLink>
        </li>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
        <li>
          <NavLink to="users">Users</NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="about" element={<About />} />
        <Route path="users" element={<Users />} />
        <Route path="home" element={<Home />} />

        {/* <Route path="*" element={<div>Not Found</div>} /> */}
        <Route path="*" element={<Navigate replace to="home" />} />
      </Routes>
    </div>
  );
};
