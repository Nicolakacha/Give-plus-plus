import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconComponent from './Icon';
import { Nav } from './Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { COLOR, EFFECT } from '../constants/style';
import useProduct from '../hooks/productHooks/useProduct';

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 110px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 15px 0;
  z-index: 99;
`;

const NavbarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const NavbarBottom = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
`;

const InputSearch = styled.input`
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0);
`;

const RightSide = styled.div`
  margin-right: 90px;
`;

const Logo = styled(Link)`
  background: url(${process.env.PUBLIC_URL}/logo.png) center/cover;
  height: 32px;
  width: 100px;
`;

const OptionList = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 32px;
  border-radius: 8px;
  background: #f1f3f4;
  margin-left: 40px;
  box-shadow: ${EFFECT.shadowLight};
  & div {
    display: flex;
    align-items: center;
  }
`;

const ProductCategoriesList = styled.ul`
  display: flex;
  align-items: center;
`;

const ProductCategoryItem = styled.li`
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  & p {
    margin-left: -5px;
    color: ${COLOR.black};
    &:hover {
      color: ${COLOR.hover};
    }
  }
  &:hover {
    box-shadow: ${EFFECT.shadowHover};
  }
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const handleChangeInput = (e) => setValue(e.target.value);
  const handleSearchProduct = (keyWord) => {
    navigate(`/products/search/${keyWord}`);
    setValue('');
  };

  return (
    <SearchBarContainer>
      <div>
        <IconComponent kind={'search'} />
        <InputSearch
          value={value}
          onChange={handleChangeInput}
          placeholder='搜尋物品'
          onKeyDown={(e) => {
            if (e.keyCode === 13 && value !== '') {
              handleSearchProduct(value);
            }
          }}
        />
      </div>
      <IconComponent kind={'angle-down'} />
    </SearchBarContainer>
  );
};

const CategoryItemContainer = ({ text, id }) => {
  return (
    <NavLink to={`/products/category/${id}`}>
      <ProductCategoryItem>
        <IconComponent kind={`product_category_${id}`} />
        <p>{text}</p>
      </ProductCategoryItem>
    </NavLink>
  );
};

const Navbar = () => {
  const { productCategories, handleGetProductCategories } = useProduct();
  useEffect(() => {
    handleGetProductCategories();
  }, []);

  return (
    <NavbarContainer>
      <NavbarTop>
        <LeftSide>
          <Logo to='/' />
          <SearchBar />
        </LeftSide>
        <RightSide>
          <OptionList>
            <IconComponent kind={'user-circle'} />
            <IconComponent kind={'shopping-cart'} />
            <IconComponent kind={'setting'} />
            <IconComponent kind={'bed'} />
            <Nav children={'登入 / 註冊'} path={'/entrance'} />
          </OptionList>
        </RightSide>
      </NavbarTop>
      <NavbarBottom>
        <ProductCategoriesList>
          {productCategories.map((category) => (
            <CategoryItemContainer
              text={category.name}
              id={category.id}
              key={category.id}
            />
          ))}
        </ProductCategoriesList>
      </NavbarBottom>
    </NavbarContainer>
  );
};

export default Navbar;
