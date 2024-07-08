import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import useGetFeedPosts from "@/hooks/useGetFeedPosts";
import FeedPost from "@/components/FeedPosts/FeedPost";

export default function FeedPosts() {
  const { isLoading, posts } = useGetFeedPosts();
  const authUser = useAuthStore((state) => state.user);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>Dummy Content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
            h={"100vh"}
            textAlign={"center"}
            mx={"auto"}
            gap={2}
          >
            <Text fontSize={"2xl"}>Trông có vẻ như bạn chưa có bạn bè.</Text>
            <Text fontSize={"md"}>Bạn nên ra ngoài chạm cỏ và kết bạn đi!</Text>
            <Link
              as={RouterLink}
              to={`/${authUser?.username}`}
              color={"blue.500"}
              w={"max-content"}
              mx={"auto"}
            >
              Quay vào trang hồ sơ
            </Link>
          </Flex>
        </>
      )}
    </Container>
  );
}
