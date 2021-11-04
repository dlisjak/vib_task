import { Button as Btn } from '@chakra-ui/button';

const Button = (props) => {
  return (
    <Btn
      variant="unstyled"
      borderRadius={0}
      display="flex"
      pt={2}
      pb={2}
      pl={6}
      pr={6}
      {...props}
    />
  );
};

export default Button;
