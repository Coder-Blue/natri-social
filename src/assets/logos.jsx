import { Image, Text } from "@chakra-ui/react";

export const NatriSymbol = () => (
  <Text fontSize={"3xl"} as={"b"}>
    natri
  </Text>
);

export const NatriLogo = () => (
  <Image
    src="/natri.png"
    alt="Natri Logo"
    boxSize={"25px"}
    objectFit={"cover"}
  />
);
