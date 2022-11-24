import {
  Box,
  Button,
  Center,
  HStack,
  Spacer,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Disconnected from "../components/Disconnected";
import NavBar from "../components/NavBar";
import { useWallet } from "@solana/wallet-adapter-react";
import Connected from "../components/Connected";
import { MouseEventHandler, useCallback } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <div className={styles.container}>
      <Head>
        <title>Buildoors</title>
        <meta name="The NFT Collection for Buildoors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={connected ? "" : "url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />

          <Spacer />
          <Center>{connected ? <Connected /> : <Disconnected />}</Center>
          <Spacer />
          {/* <HStack>
            <Image src="1.png" w={50} h={50} />
            <Image src="2.png" w={50} h={50} />
            <Image src="3.png" w={50} h={50} />
            <Image src="4.png" w={50} h={50} />
            <Image src="5.png" w={50} h={50} />
          </HStack> */}

          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/_buildspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                built with @_buildspace
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
