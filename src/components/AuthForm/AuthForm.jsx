import { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Login from "@/components/AuthForm/Login";
import Signup from "@/components/AuthForm/Signup";
import GoogleAuth from "@/components/AuthForm/GoogleAuth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Text color={"white"} as="b" fontSize={"4xl"} cursor={"pointer"}>
            natri
          </Text>
          {isLogin ? <Login /> : <Signup />}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              HOẶC
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
          <GoogleAuth prefix={isLogin ? "Đăng nhập" : "Đăng ký"} />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            fontSize={14}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
