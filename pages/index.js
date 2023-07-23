import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  ScaleFade,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";

function Index() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({});
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (copiedDiscord) setTimeout(() => setCopiedDiscord(false), 3000);
  }, [copiedDiscord]);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        "https://api.discord-status.me/raw/942536039505985557"
      ).catch((e) => {});

      if (res === undefined || !res.ok)
        return toast({
          status: "error",
          position: "bottom-right",
          title: "Error",
          description: "Error loading Discord status",
        });

      let result = await res.json().catch((e) => {});
      if (result === undefined)
        return toast({
          status: "error",
          position: "bottom-right",
          title: "Error",
          description: "Error loading Discord status",
        });

      console.log(result);
      setStatus(result);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );

  return (
    <>
      <Head>
        <title>runa.live</title>
        <link
          rel="icon"
          type="image/png"
          sizes="2048x2048"
          href={status.user ? status.user.avatar : ""}
        />
      </Head>

      <Center>
        <Container maxW="container.xl">
          <Flex
            flexDir="row"
            gap="100%"
            mt={10}
            p={25}
            borderRadius={10}
            w="100%"
            bg="rgba(0, 0, 0, 0.2)"
            boxShadow="3px 3px rgba(0, 0, 0, 0.10)"
            position="relative"
          >
            <VStack spacing={4} alignItems="left">
              <Flex flexDir="row" gap={4} alignItems="center">
                <Avatar w={100} h={100} src={status.user.avatar} />
                <VStack alignItems="left" spacing={0}>
                  <Heading fontSize="270%" textShadow="1px 1px black">
                    {status.user.username}
                  </Heading>
                  <Text opacity="75%" fontSize="150%">
                    full stack developer
                  </Text>
                </VStack>
              </Flex>

              <Text
                fontSize="130%"
                opacity="75%"
                w={400}
                textShadow="1px 1px black"
                fontWeight={350}
              >
                React / Next | JavaScript | C#
              </Text>

              <VStack
                alignItems="right"
                textAlign="right"
                spacing={1}
                display={{ md: "none" }}
              >
                <SocialLink
                  icon={<FaDiscord />}
                  href="runabox"
                  type="copy"
                  text="Discord"
                  copyState={copiedDiscord}
                  setCopyState={setCopiedDiscord}
                />

                <SocialLink
                  icon={<FaGithub />}
                  href="https://github.com/Runabox"
                  type="link"
                  text="GitHub"
                />
              </VStack>
            </VStack>

            <VStack
              alignItems="right"
              textAlign="right"
              position="absolute"
              right={25}
              spacing={1}
              display={{ base: "none", md: "flex" }}
            >
              <SocialLink
                icon={<FaDiscord />}
                href="runabox"
                type="copy"
                text="Discord"
                copyState={copiedDiscord}
                setCopyState={setCopiedDiscord}
              />

              <SocialLink
                icon={<FaGithub />}
                href="https://github.com/Runabox"
                type="link"
                text="GitHub"
              />
            </VStack>
          </Flex>

          <Center>
            <Flex
              h={0}
              borderColor="rgba(0, 0, 0, 0.2)"
              borderWidth={1}
              alignItems="center"
              justifyContent="center"
              w="97%"
              mt={10}
            >
              <Box bg="#212121" paddingRight={2} paddingLeft={2}>
                <Text opacity="50%" fontWeight={500}>
                  PROJECTS
                </Text>
              </Box>
            </Flex>
          </Center>

          <Center>
            <Box w="100%" mb={20} mt={10}>
              <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={8} w="100%">
                <ProjectCard
                  title="upld"
                  description="An easy to use, simple file uploader made for use with ShareX."
                  status="offline"
                  thumbnail="/upld-preview.png"
                  link="https://upld.cloud"
                  gradientRGB="46,44,166"
                />

                <ProjectCard
                  title="pfps"
                  description="A website to find matching profile pictures for you and your friends."
                  status="wip"
                  thumbnail="https://sx.runa.live/chrome_WkJ8VE7uXB.png"
                  link="https://pfps.one"
                  gradientRGB="77,23,128"
                />
              </SimpleGrid>
            </Box>
          </Center>
        </Container>
      </Center>
    </>
  );
}

function ProjectCard({
  title,
  description,
  thumbnail,
  link,
  status,
  gradientRGB,
}) {
  return (
    <Center>
      <Box
        _hover={{ cursor: "pointer", opacity: "80%" }}
        as={"a"}
        href={status === "offline" || status === "wip" ? undefined : link}
        target="_blank"
        borderRadius={10}
        w={350}
        boxShadow="3px 3px rgba(0, 0, 0, 0.10)"
        bg={`linear-gradient(356deg, rgba(${gradientRGB},1) 0%, rgba(0,0,0,1) 53%, rgba(0,0,0,1) 69%)`}
        overflow="hidden"
      >
        <Image src={thumbnail} />

        <Box p={3}>
          <Flex flexDir="row" alignItems="center">
            <Heading textShadow="2px 2px black">{title}</Heading>
            <Text textAlign="right" w="100%" opacity="75%">
              Status:{" "}
              <b>
                {status === "offline"
                  ? "Offline"
                  : status === "wip"
                  ? "Under Construction"
                  : "Online"}
              </b>
            </Text>
          </Flex>
          <Text opacity="75%" mt={1}>
            {description}
          </Text>
        </Box>
      </Box>
    </Center>
  );
}

function SocialLink({
  icon,
  text,
  href,
  type = "link",
  copyState /* <-- nullable */,
  setCopyState /* <-- nullable */,
}) {
  return (
    <Tooltip
      label="Copied"
      placement="left"
      bg="rgba(0, 0, 0, 0.8)"
      mr={1}
      isDisabled={type !== "copy" ? true : copyState === true ? false : true}
      isOpen={type === "copy" && copyState === true}
      hasArrow
    >
      <Flex
        _hover={{ opacity: "60%", cursor: "pointer" }}
        href={type === "link" ? href : undefined}
        as={type === "link" ? "a" : undefined}
        target={type === "link" ? "_blank" : undefined}
        flexDir="row"
        gap={1.5}
        alignItems="center"
        onClick={
          type === "copy"
            ? () => {
                setCopyState(true);
                navigator.clipboard.writeText(href);
              }
            : undefined
        }
        opacity="80%"
      >
        {icon} <Text fontSize="110%">{text}</Text>
      </Flex>
    </Tooltip>
  );
}

export default Index;
