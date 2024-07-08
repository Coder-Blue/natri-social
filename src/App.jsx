import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout/PageLayout";
import Home from "@/pages/HomePage/Home";
import Auth from "@/pages/AuthPage/Auth";
import Profile from "@/pages/ProfilePage/Profile";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
