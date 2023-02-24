import { Avatar, AvatarBadge, Box, Center, Container, Flex, Heading, Image, ScaleFade, Spinner, Text, Tooltip, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

function Index() {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({});
    const toast = useToast();

    useEffect(() => {
        (async () => {
            let res = await fetch('https://api.discord-status.me/raw/942536039505985557').catch(e => { });

            if (res === undefined || !res.ok)
                return toast({
                    status: 'error',
                    position: 'bottom-right',
                    title: 'Error',
                    description: 'Error loading Discord status',
                });

            let result = await res.json().catch(e => { });
            if (result === undefined)
                return toast({
                    status: 'error',
                    position: 'bottom-right',
                    title: 'Error',
                    description: 'Error loading Discord status',
                });

            console.log(result);
            setStatus(result);
            setLoading(false);
        })();
    }, []);

    if (loading)
        return <Center h='100vh'><Spinner /></Center>;

    return (
        <>
            <Head>
                <title>runa.live</title>
                <link rel='icon' type="image/png" sizes="2048x2048" href={status.user ? status.user.avatar : ''} />
            </Head>

            <Container maxW='container.xl'>
                <Center h='100vh'>
                    <ScaleFade initialScale={0.75} in={true}>
                        <Box borderRadius={50} w={500} h={250} shadow='0px 0px 40px 30px rgba(71, 10, 145, 0.80)' bg='rgba(71, 10, 145, 0.8)' opacity='80%'>
                            <Center h='100%'>
                                <Flex w='90%'>
                                    <Avatar
                                        src={status.user.avatar}
                                        w={150}
                                        h={150}
                                    >
                                        <Tooltip placement='top' label={status['status_text']} bg='rgba(20, 20, 20, 1)' mb={-1} closeDelay={500}>
                                            <AvatarBadge as={Image} w={50} bg='black' borderWidth={5} borderColor='rgba(0, 0, 0, 0.0)' h={50} src={status['status_image']} />
                                        </Tooltip>
                                    </Avatar>

                                    <Box ml={5} opacity='55%'>
                                        <Tooltip placement='top' label={status.user.id} bg='rgba(20, 20, 20, 1)' mb={-4} closeDelay={500}>
                                            <Text fontSize='250%'>{status.user.username}<span style={{ opacity: '60%' }}>#{status.user.discriminator}</span></Text>
                                        </Tooltip>
                                        <Text>full stack developer</Text>
                                        <Text>react | js | c# | next</Text>
                                    </Box>
                                </Flex>
                            </Center>
                        </Box>
                    </ScaleFade>
                </Center>
            </Container></>
    )
}

export default Index;