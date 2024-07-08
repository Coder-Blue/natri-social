import useLogout from "@/hooks/useLogout";
import useAuthStore from "@/store/authStore";
import { Link } from "react-router-dom";
import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function SuggestedHeader() {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      gap={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${authUser.username}`}>
          <Avatar size={"lg"} src={authUser.profilePicURL} />
        </Link>
        <Text fontSize={12} fontWeight={"bold"}>
          {authUser.username}
        </Text>
      </Flex>
      <Flex
        size={"xs"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        onClick={handleLogout}
        isLoading={isLoggingOut}
      >
        Đăng xuất
      </Flex>
    </Flex>
  );
}
