import { auth, firestore } from "@/firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Flex, Image, Text } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import useShowToast from "@/hooks/useShowToast";

export default function GoogleAuth({ prefix }) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);
  const showToast = useShowToast();

  async function handleGoogleAuth() {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Lỗi tài khoản Google", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Lỗi tài khoản Google", error.message, "error");
    }
  }

  return (
    <>
      <Flex
        onClick={handleGoogleAuth}
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
      >
        <Image src="/google.png" w={5} alt="GoogleLogo" />
        <Text mx={2} color={"blue.500"}>
          {prefix} bằng Google
        </Text>
      </Flex>
    </>
  );
}
