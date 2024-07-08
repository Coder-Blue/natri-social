import useSearchUser from "@/hooks/useSearchUser";
import { Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import SearchModal from "@/components/PopUpModal/SearchModal";
import { SearchLogo } from "@/assets/constants";

export default function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  return (
    <>
      <Tooltip
        hasArrow
        label={"Tìm kiếm"}
        placement={"right"}
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
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Tìm kiếm</Box>
        </Flex>
      </Tooltip>
      <SearchModal
        getUserProfile={getUserProfile}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        user={user}
        setUser={setUser}
      />
    </>
  );
}
