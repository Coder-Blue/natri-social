import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SidebarItems from "@/components/Sidebar/SidebarItems";
import useLogout from "@/hooks/useLogout";
import { NatriLogo, NatriSymbol } from "@/assets/logos";
import { LogOutIcon } from "lucide-react";

export default function Sidebar() {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          cursor={"pointer"}
          style={{ textDecoration: "none" }}
          display={{ base: "none", md: "block" }}
        >
          <NatriSymbol />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          cursor={"pointer"}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={10}
        >
          <NatriLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        <Tooltip
          hasArrow
          label={"Đăng xuất"}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <LogOutIcon size={25} />
            <Button
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
              display={{ base: "none", md: "block" }}
            >
              Đăng xuất
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
}
