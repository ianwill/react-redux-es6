import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

//destructuring props that are passed in
const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};
/*
 * the example below leans on the short circuiting nature of the logical "&" operator.
 * it keeps thing short by
 * only evaluate the right side  when the left is true
 * {loading && <LoadingDots interval={100} dots={20}/>}
 */

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};
export default Header;
