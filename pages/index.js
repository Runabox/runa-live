import { Box, Center, Container, Heading, Text, Tooltip } from "@chakra-ui/react";

function Index() {
    return (
        <Container maxW='container.xl'>
            <Center h='100vh'>
                <Box>
                    <Tooltip label='runa#0002' hasArrow>
                        <Heading fontSize='500%' textShadow='5px 5px 8px lightblue'>runa.live</Heading>
                    </Tooltip>
                </Box>
            </Center>
        </Container>
    )
}

export default Index;