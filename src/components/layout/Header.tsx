import {HStack, useColorModeValue, Container, Image, Show} from "@chakra-ui/react"
import AcountNavigation from "components/navigation/AcountNavigation"
import {NavMenuDrawer} from "../navigation/NavMenuDrawer"
import { Link } from "../navigation/Link"

const Header = () => {
  return (
    <Container
      as="header"
      backgroundColor={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      maxW="full"
      position="sticky"
      top="0px"
      zIndex="10"
      borderBottom={".5px solid"}
      borderColor="st.borderColor"
    >
      <HStack justifyContent="space-between" alignItems={"center"} h="headerHeight" px={[0, 4]}>
        <Show below="sm">
          <NavMenuDrawer />
        </Show>
        <Link href="/" display="flex" alignItems="center" height="100%">
          <Image src="/vector/shop.svg" alt="PLAY! Marketplace logo" maxW={240} w="full" />
        </Link>
        <AcountNavigation />
      </HStack>
    </Container>
  )
}

export default Header
