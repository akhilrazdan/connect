import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import GroupedMentors from "./components/grouped-mentors/grouped-mentors.component";
import Unauthorized from "./components/unauthorized/unauthorized.component"
import ProtectedRoute from "./routes/protected-route/protected-route.component";


const App = () => {
  console.log("Loading App.js")
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute element={Navigation} roles={['guest', 'mentee']} />}>
        <Route index element={<ProtectedRoute element={GroupedMentors} roles={['mentee']} />} />
        <Route path='/unauthorized' element={<ProtectedRoute element={Unauthorized} roles={['guest']} />} />
      </Route>
      <Route path='/auth' element={<Authentication />} />
      {/* ... other routes */}
    </Routes>
  );
};


export default App;