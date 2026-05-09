import {
  Navigate,
  useLocation,
} from "react-router-dom";

export default function PrivateRoute({

  children,

  allowedRoles = [],

}) {

  const location =
    useLocation();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!user) {

    return (
      <Navigate
        to="/login"
        state={{
          from:
            location.pathname,
        }}
        replace
      />
    );
  }

  /* =========================
     ROLE CHECK
  ========================= */

  if (

    allowedRoles.length > 0 &&

    !allowedRoles.includes(
      user.role
    )

  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  /* =========================
     ACCESS GRANTED
  ========================= */

  return children;
}