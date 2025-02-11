import styled from 'styled-components';

const variants = {
  h1: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#222222",
  },
  h2: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#222222",
  },
  h3: {
    fontSize: "17px",
    fontWeight: "500",
    color: "#222222",
  },
  p: {
    fontSize: "15px",
    fontWeight: "400",
    color: "#222222",
  },
  span: {
    fontSize: "15px",
    fontWeight: "400",
    color: "#6B7177",
  },
  strong: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#222",
  },
};

const StyledTypography = styled.div`
  font-size: ${(props) => variants[props.variant]?.fontSize || "1rem"};
  font-weight: ${(props) => variants[props.variant]?.fontWeight || "400"};
  color: ${(props) => variants[props.variant]?.color || "#666"};
  line-height: 1.5;
`;

const Typography = ({ variant = "p", children, ...props }) => {
  return (
    <StyledTypography as={variant} variant={variant} {...props}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
