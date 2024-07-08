import { useState } from "react";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useShowToast from "@/hooks/useShowToast";

export default function useSearchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  async function getUserProfile(username) {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username),
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty)
        return showToast("Lỗi", "Không tìm thấy người dùng", "error");

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Lỗi", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, getUserProfile, user, setUser };
}
