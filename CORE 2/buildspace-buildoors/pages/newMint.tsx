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

import NavBar from "../components/NavBar";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

interface NewMintProps {
  mint: PublicKey;
}

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
  const [metadata, setMetadata] = useState<any>();
  const { connection } = useConnection();
  const walletAdapter = useWallet();
  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  }, [connection, walletAdapter]);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {},
    []
  );

  useEffect(() => {
    // What this does is to allow us to find the NFT object
    // based on the given mint address
    console.log(mint);
    metaplex
      .nfts()
      .findByMint({ mintAddress: mint })
      .then((nft) => {
        console.log(nft.json);
        // We then fetch the NFT uri to fetch the NFT metadata
        fetch(nft.uri)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata);
          });
      })
      .catch((e) => console.log(e));
  }, [mint, metaplex, walletAdapter]);

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
        bgImage={"url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <Spacer />

          <Center>
            <Button
              bgColor="accent"
              color="white"
              maxWidth="380px"
              onClick={handleClick}
            >
              <HStack>
                <Text>stake my buildoor</Text>
                <ArrowForwardIcon />
              </HStack>
            </Button>
          </Center>
          <Spacer />
        </Stack>
      </Box>
    </div>
  );
};

export default NewMint;
