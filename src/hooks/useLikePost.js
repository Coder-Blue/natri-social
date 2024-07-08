import { useState } from "react";
import { firestore } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthStore from "@/store/authStore";
import useShowToast from "@/hooks/useShowToast";

export default function useLikePost(post) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const authUser = useAuthStore((state) => state.user);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
  const showToast = useShowToast();

  async function handleLikePost() {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Lỗi",
        "Bạn buộc phải đăng nhập mới có thể tương tác",
        "error",
      );
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      showToast("Lỗi", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  }

  return { isLiked, likes, handleLikePost, isUpdating };
}
