import { useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useLikePost from "@/hooks/useLikePost";
import usePostComment from "@/hooks/usePostComment";
import useAuthStore from "@/store/authStore";
import CommentsModal from "@/components/Comment/Modal/CommentsModal";
import { timeAgo } from "@/hooks/utils/timeAgo";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";

export default function PostFooter({ post, isProfilePage, creatorProfile }) {
  const commentRef = useRef(null);
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isCommenting, handlePostComment } = usePostComment();
  const authUser = useAuthStore((state) => state.user);
  const { handleLikePost, isLiked, likes } = useLikePost(post);

  async function handleSubmitComment() {
    await handlePostComment(post.id, comment);
    setComment("");
  }

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} lượt thích
      </Text>
      {isProfilePage && (
        <Text fontSize="12" color={"gray"}>
          Đăng vào {timeAgo(post.createdAt)}
        </Text>
      )}
      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize="sm"
              color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              Xem tất cả {post.comments.length} bình luận
            </Text>
          )}
          {isOpen ? (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Viết một bình luận..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Đăng
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
}
