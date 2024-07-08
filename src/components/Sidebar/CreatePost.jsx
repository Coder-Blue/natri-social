import PostCreateModal from "@/components/PopUpModal/PostCreateModal";
import { Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CreatePostLogo } from "@/assets/constants";

export default function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        hasArrow
        label={"Đăng bài"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Đăng bài</Box>
        </Flex>
      </Tooltip>
      <PostCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
