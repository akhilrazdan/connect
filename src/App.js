import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import GroupedMentors from "./components/grouped-mentors/grouped-mentors.component";
import Unauthorized from "./components/unauthorized/unauthorized.component"
import Dashboard from "./components/dashboard/dashboard.component";
import ProtectedRoute from "./routes/protected-route/protected-route.component";
import Faq from "./components/faq/faq.component";
import { useContext } from "react";
import { UnifiedUserContext } from "./contexts/unified-user.context";
const routeConfig = [
  {
    path: '/',
    component: Navigation,
    roles: ['unsigned', 'guest', 'mentee', 'admin'],
    subRoutes: [
      { index: true, component: GroupedMentors, roles: ['mentee'] },
      { index: true, component: Dashboard, roles: ['admin'] },
      { path: 'faq', component: Faq, roles: ['guest', 'mentee', 'admin'] },
      { path: 'unauthorized', component: Unauthorized, roles: ['guest'] }
    ]
  },
  {
    path: '/auth',
    component: Authentication,
    roles: ['unsigned', 'guest', 'mentee', 'admin']
  }
];

const createRoutesForRole = (role) => {

  if (role === 'unsigned') {
    // For unsigned users, only show the auth route and redirect all other paths to it
    return [
      <Route key="/" path="/" element={<Navigate to="/auth" />} />, // Redirect to /auth or a suitable component
      <Route key="/auth" path="/auth" element={<Authentication />} />,
    ];
  }

  return routeConfig.flatMap((route) => {
    if (route.roles.includes(role)) {
      let subRoutes = route.subRoutes?.flatMap((subRoute) => {
        if (subRoute.roles.includes(role)) {
          console.log(`Creating subroute ${route.path}-${subRoute.path || 'index'}`)
          return (
            <Route
              key={`${route.path}-${subRoute.path || 'index'}`}
              path={subRoute.path}
              index={subRoute.index}
              element={<ProtectedRoute element={subRoute.component} roles={subRoute.roles} />}
            />
          );
        }
        return [];
      });

      return (
        <Route key={route.path} path={route.path} element={<route.component />}>
          {subRoutes}
        </Route>
      );
    }
    return [];
  });
};

const App = () => {
  const { role } = useContext(UnifiedUserContext);
  console.log("Loading routes for role: ", role)
  return (
    <Routes>
      {createRoutesForRole(role)}
    </Routes>
  );
};


export default App;