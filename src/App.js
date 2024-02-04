import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import GroupedMentors from "./components/grouped-mentors/grouped-mentors.component";
import Unauthorized from "./components/unauthorized/unauthorized.component"
import ProtectedRoute from "./routes/protected-route/protected-route.component";
import Faq from "./components/faq/faq.component";

const App = () => {
  console.log("Loading App.js")
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<ProtectedRoute element={GroupedMentors} roles={['mentee']} />} />
        <Route path='/faq' element={<ProtectedRoute element={Faq} roles={['guest', 'mentee']} />} />
        <Route path='/unauthorized' element={<ProtectedRoute element={Unauthorized} roles={['guest']} />} />
      </Route>
      <Route path='/auth' element={<Authentication />} />
    </Routes>
  );
};


export default App;