/* eslint-disable no-unused-vars */
import { auth, firestore } from "@/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "@/hooks/useShowToast";
import useAuthStore from "@/store/authStore";

export default function useLogin() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const showToast = useShowToast();

  async function logIn(inputs) {
    if (!inputs.email || !inputs.password) {
      return showToast("Lỗi đăng nhập", "Hãy điền đầy đủ thông tin", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password,
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Lỗi đăng nhập", error.message, "error");
    }
  }

  return { loading, error, logIn };
}
