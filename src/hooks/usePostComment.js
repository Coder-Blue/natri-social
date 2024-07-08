import { useState } from "react";
import { firestore } from "@/firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import useShowToast from "@/hooks/useShowToast";

export default function usePostComment() {
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const showToast = useShowToast();

  async function handlePostComment(postId, comment) {
    if (isCommenting) return;
    if (!authUser)
      return showToast(
        "Lỗi",
        "Bạn buộc phải đăng nhập mới có thể tương tác",
        "error",
      );
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (error) {
      showToast("Lỗi", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  }

  return { isCommenting, handlePostComment };
}
