import { Box, Flex, Text } from "@chakra-ui/react";
import { Bookmark, Grid3X3, Heart } from "lucide-react";

export default function ProfileTabs() {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex
        borderTop={"1px solid white"}
        alignItems={"center"}
        p={"3"}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <Grid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Bài đăng
        </Text>
      </Flex>
    </Flex>
  );
}
