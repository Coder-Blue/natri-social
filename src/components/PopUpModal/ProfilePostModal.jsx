import { useState } from "react";
import { firestore, storage } from "@/firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import useUserProfileStore from "@/store/userProfileStore";
import { MdDelete } from "react-icons/md";
import Caption from "@/components/Comment/Caption";
import Comment from "@/components/Comment/Comment";
import PostFooter from "@/components/FeedPosts/PostFooter";
import useShowToast from "@/hooks/useShowToast";

export default function ProfilePostModal({ isOpen, onClose, post }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  async function handleDeletePost() {
    if (!window.confirm("Bạn có chắc là bạn muốn xóa bài đăng này?")) return;
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={{ base: "3xl", md: "5xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={"black"} pb={5}>
          <Flex
            gap="4"
            w={{ base: "90%", sm: "70%", md: "full" }}
            mx={"auto"}
            maxH={"90vh"}
            minH={"50vh"}
          >
            <Flex
              borderRadius={4}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"whiteAlpha.300"}
              flex={1.5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src={post.imageURL} alt="Profile Post" />
            </Flex>
            <Flex
              flex={1}
              flexDir={"column"}
              px={10}
              display={{ base: "none", md: "flex" }}
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={4}>
                  <Avatar
                    src={userProfile.profilePicURL}
                    size={"sm"}
                    name="As a Programmer"
                  />
                  <Text fontWeight={"bold"} fontSize={12}>
                    {userProfile.username}
                  </Text>
                </Flex>
                {authUser?.uid === userProfile.uid && (
                  <Button
                    size={"sm"}
                    bg={"transparent"}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Button>
                )}
              </Flex>
              <Divider my={4} bg={"gray.500"} />
              <VStack
                w="full"
                alignItems={"start"}
                maxH={"350px"}
                overflowY={"auto"}
              >
                {post.caption && <Caption post={post} />}
                {post.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </VStack>
              <Divider my={4} bg={"gray.800"} />
              <PostFooter isProfilePage={true} post={post} />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
