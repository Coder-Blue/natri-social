import { Flex, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import ProfilePostModal from "@/components/PopUpModal/ProfilePostModal";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

export default function ProfilePost({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <GridItem
        onClick={onOpen}
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="Profile Post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <ProfilePostModal isOpen={isOpen} onClose={onClose} post={post} />
    </>
  );
}
