import { Button as Btn } from '@chakra-ui/button';

const Button = (props) => {
  return (
    <Btn
      variant="unstyled"
      borderRadius={0}
      display="flex"
      pt={4}
      pb={4}
      pl={6}
      pr={6}
      {...props}
    />
  );
};

export default Button;
