import { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import usePostStore from "@/store/postStore";
import useUserProfileStore from "@/store/userProfileStore";
import useShowToast from "@/hooks/useShowToast";

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  useEffect(() => {
    async function getPosts() {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid),
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);

        setPosts(posts);
      } catch (error) {
        showToast("Lỗi", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
}
