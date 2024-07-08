import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "@/components/AuthForm/AuthForm";

function Auth() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.jpg" h={750} alt="NatriLogin" />
          </Box>
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Tải ứng dụng ngay.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image
                cursor={"pointer"}
                src="/playstore.png"
                h={"10"}
                alt="PlaystoreLogo"
              />
              <Image
                cursor={"pointer"}
                src="/microsoft.png"
                h={"10"}
                alt="MicrosoftLogo"
              />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Auth;
