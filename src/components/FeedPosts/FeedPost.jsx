import { Box, Image } from "@chakra-ui/react";
import PostHeader from "@/components/FeedPosts/PostHeader";
import PostFooter from "@/components/FeedPosts/PostFooter";
import useGetUserProfileById from "@/hooks/useGetUserProfileById";

export default function FeedPost({ post }) {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box
        my={2}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={4}
        overflow={"hidden"}
      >
        <Image src={post.imageURL} alt={"Ảnh bài đăng"} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
}
