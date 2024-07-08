import { useRef } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import SuggestedUser from "@/components/SuggestedUsers/SuggestedUser";

export default function SearchModal({
  getUserProfile,
  isOpen,
  onClose,
  isLoading,
  user,
  setUser,
}) {
  const searchRef = useRef(null);

  function handleSearchUser(e) {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Tìm kiếm người dùng</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSearchUser}>
            <FormControl>
              <FormLabel>Người dùng</FormLabel>
              <Input placeholder="Tên người dùng" ref={searchRef} />
            </FormControl>
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isLoading}
              >
                Tìm kiếm
              </Button>
            </Flex>
          </form>
          {user && <SuggestedUser user={user} setUser={setUser} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
