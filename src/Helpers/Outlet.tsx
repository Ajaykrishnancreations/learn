import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loadable';

const SideNavigation = React.lazy(() => import("../Components/SideNavigation"));

export const PageFrame = () => {
  const auth: string = "true";
  return auth === "true" ? (
    <SideNavigation>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </SideNavigation>
  ) : (
    <Navigate to={"/"} />
  );
};