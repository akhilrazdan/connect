import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import Home from "./components/home/home.component";
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import MentorList from "./components/MentorList/mentor-list.component";
import GroupedMentors from "./components/grouped-mentors/grouped-mentors.component";


const App = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <div>
      <Routes>
        <Route path='/' element={currentUser ? <Navigation /> : <Navigate to="/auth" />}>
          <Route index element={<GroupedMentors />} />
        </Route>
        <Route path='/auth' element={<Authentication />} />

      </Routes>
    </div>
  );
};

export default App;