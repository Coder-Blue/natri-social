import { useEffect, useRef } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import usePostComment from "@/hooks/usePostComment";
import Comment from "@/components/Comment/Comment";

export default function CommentsModal({ isOpen, onClose, post }) {
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const { handlePostComment, isCommenting } = usePostComment();

  async function handleSubmitComment(e) {
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  }

  useEffect(() => {
    function scrollToBottom() {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    }

    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Bình luận</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
            <Input placeholder="Bình luận" size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Đăng
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
