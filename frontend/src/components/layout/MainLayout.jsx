import { Container } from "rsuite";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return <Container className="MainLayout">{children}</Container>;
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
