import { auth } from "@/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import useAuthStore from "@/store/authStore";
import useShowToast from "@/hooks/useShowToast";

export default function useLogout() {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);

  async function handleLogout() {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      showToast("Lỗi đăng xuất", error.message, "error");
    }
  }

  return { handleLogout, isLoggingOut, error };
}
