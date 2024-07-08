import { useState } from "react";
import useLogin from "@/hooks/useLogin";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const { loading, error, logIn } = useLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        value={inputs.email}
        size={"sm"}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        fontSize={14}
      />
      <InputGroup>
        <Input
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          fontSize={14}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        onClick={() => logIn(inputs)}
        isLoading={loading}
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
      >
        Đăng nhập
      </Button>
    </>
  );
}
