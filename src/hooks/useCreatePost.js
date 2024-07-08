import { useState } from "react";
import { firestore, storage } from "@/firebase/firebase";
import { useLocation } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import useUserProfileStore from "@/store/userProfileStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useShowToast from "@/hooks/useShowToast";

export default function useCreatePost() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  async function handleCreatePost(selectedFile, caption) {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Hãy chọn một bức ảnh");
    setIsLoading(true);

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Thành công", "Đã tạo bài đăng thành công", "success");
    } catch (error) {
      showToast("Lỗi", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleCreatePost };
}
