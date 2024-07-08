import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "@/components/SuggestedUsers/SuggestedHeader";
import SuggestedUser from "@/components/SuggestedUsers/SuggestedUser";

export default function SuggestedUsers() {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Gợi ý dành cho bạn
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            Tất cả
          </Text>
        </Flex>
      )}
      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2024 được tạo ra bởi{" "}
        <Link
          href="https://www.facebook.com/noah.tran1109"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
          style={{ textDecoration: "none" }}
        >
          Noah Trần
        </Link>
      </Box>
    </VStack>
  );
}
