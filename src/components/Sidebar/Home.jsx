import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Tooltip } from "@chakra-ui/react";
import { House } from "lucide-react";

export default function Home() {
  return (
    <Tooltip
      hasArrow
      label={"Trang chủ"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <House />
        <Box display={{ base: "none", md: "block" }}>Trang chủ</Box>
      </Link>
    </Tooltip>
  );
}
