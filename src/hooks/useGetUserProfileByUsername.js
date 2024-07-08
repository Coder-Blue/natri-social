import { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useShowToast from "@/hooks/useShowToast";
import useProfileStore from "@/store/userProfileStore";

export default function useGetUserProfileByUsername(username) {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = useProfileStore();
  const showToast = useShowToast();

  useEffect(() => {
    async function getUserProfile() {
      setIsLoading(true);

      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username),
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
      } catch (error) {
        showToast("Lỗi", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    }
    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
}
