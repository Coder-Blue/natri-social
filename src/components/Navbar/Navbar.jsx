import { Link } from "react-router-dom";
import { Button, Container, Flex, Image } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        <Image
          src="/natri.png"
          boxSize={"50px"}
          objectFit={"cover"}
          display={{ base: "none", sm: "block" }}
          cursor={"pointer"}
        />
        <Flex gap={4}>
          <Link to="/auth">
            <Button colorScheme={"blue"} size={"sm"}>
              Đăng nhập
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant={"outline"} size={"sm"}>
              Đăng ký
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
