import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

const Link = (props) => {
	const { href, children } = props;

	return (
		<NextLink
			href={href}
			passHref
		>
			<ChakraLink {...props}>
				{children}
			</ChakraLink>
		</NextLink>
	)
};

export default Link;
