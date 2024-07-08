import { useRef, useState } from "react";
import usePreviewImg from "@/hooks/usePreviewImg";
import useCreatePost from "@/hooks/useCreatePost";
import {
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { ImageUp } from "lucide-react";
import useShowToast from "@/hooks/useShowToast";

export default function PostCreateModal({ isOpen, onClose }) {
  const imageRef = useRef(null);
  const [caption, setCaption] = useState("");
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isLoading, handleCreatePost } = useCreatePost();
  const showToast = useShowToast();

  async function handlePostCreation() {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Lỗi", error.message, "error");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"}>
        <ModalHeader>Đăng bài</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Textarea
            placeholder="Hãy viết gì đó..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />
          <ImageUp
            onClick={() => imageRef.current.click()}
            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
            size={16}
          />
          {selectedFile && (
            <Flex
              mt={5}
              w={"full"}
              position={"relative"}
              justifyContent={"center"}
            >
              <Image src={selectedFile} alt="Selected img" />
              <CloseButton
                position={"absolute"}
                top={2}
                right={2}
                onClick={() => {
                  setSelectedFile(null);
                }}
              />
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
            Đăng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
