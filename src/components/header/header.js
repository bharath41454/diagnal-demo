import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { searchItem } from "../../actions/search";
import Search from "../search/search";

const Header = ({ searchItem, title = "" }) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    searchItem({ searchKey: input, isSearchActive });
  }, [input]);

  const handleBlur = () => {
    setSearchActive(false);
    setInput("");
  };

  return (
    <React.Fragment>
      <Navbar>
        <Nav navbar className='ml-auto'>
          <NavItem className='back'>
            <NavLink href='/' />
          </NavItem>
          <NavItem>{title}</NavItem>
        </Nav>
        <Search
          handleBlur={handleBlur}
          input={input}
          setSearchActive={setSearchActive}
          setInput={setInput}
        />
      </Navbar>
    </React.Fragment>
  );
};

const mapStateToProps = ({ pageData = {} }) => {
  const { title } = pageData;
  return {
    title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchItem: bindActionCreators(searchItem, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
