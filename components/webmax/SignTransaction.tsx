import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IntmaxWalletSigner, NoRedirect } from "webmax";

type Inputs = {
  to: string;
  value: string;
  gasLimit: number;
};

export const SignTransaction = () => {
  const [result, setResult] = useState("");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    to,
    value,
    gasLimit,
  }: Inputs): Promise<void> => {
    try {
      const tx = {
        to,
        value: value,
        gasLimit,
      };

      const signer = new IntmaxWalletSigner();
      const signature = await signer.signTransaction<NoRedirect>(tx);

      const isEVMSign = !Array.isArray(signature);
      // @ts-ignore
      const tmp = isEVMSign ? signature as string: (signature as string[]).join(",");
      setResult(tmp);

      toast({
        title: "Success Sign Transaction",
        position: "bottom",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: (error as Error).message,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleClick = (key: "to" | "value" | "gasLimit"): void => void resetField(key);

  return (
    <Flex textAlign="center" fontSize="xl" direction="column" className="text-white">
      <VStack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3} my={2}>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                To Address
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="0x..."
                  {...register("to", {
                    required: "address is required",
                  })}
                />
                  <InputRightElement width="2rem" pointerEvents="none">
    <SmallCloseIcon color="gray" cursor="pointer" onClick={() => handleClick("to")} />
  </InputRightElement>
              </InputGroup>
            </Flex>
            {errors.to && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.to.message}
              </Text>
            )}
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                Transaction Value
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="0.01"
                  {...register("value", {
                    required: "value is required",
                  })}
                />
                  <InputRightElement width="2rem" pointerEvents="none">
    <SmallCloseIcon color="gray" cursor="pointer" onClick={() => handleClick("value")} />
  </InputRightElement>
              </InputGroup>
            </Flex>
            {errors.value && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.value.message}
              </Text>
            )}
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                gas
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="21000"
                  {...register("gasLimit", {
                    required: "gasLimit is required",
                    valueAsNumber: true,
                  })}
                />
                  <InputRightElement width="2rem" pointerEvents="none">
    <SmallCloseIcon color="gray" cursor="pointer" onClick={() => handleClick("gasLimit")} />
  </InputRightElement>
              </InputGroup>
            </Flex>
            {errors.gasLimit && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.gasLimit.message}
              </Text>
            )}
          </Flex>
        </VStack>
        <Button type="submit">Sign Transaction</Button>
      </VStack>
    </Flex>
  );
};
