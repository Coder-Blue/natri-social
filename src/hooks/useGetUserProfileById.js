import { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "@/hooks/useShowToast";

export default function useGetUserProfileById(userId) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    async function getUserProfile() {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Lỗi", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    }
    getUserProfile();
  }, [showToast, setUserProfile, userId]);

  return { isLoading, userProfile, setUserProfile };
}
