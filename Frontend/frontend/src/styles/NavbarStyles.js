import styled from 'styled-components';

export const NavbarContainer = styled.div`
  background-color: #1f4ba7;
  padding: 20px 40px;  /* Aumentamos el padding en los lados */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;


export const Logo = styled.img`
  height: 55px;
`;

export const Icono = styled.img`
  height: 30px;
  padding-right: 8px;
`;

export const NavLinks = styled.div`
  display: flex;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

export const NavButton = styled.button`
  background-color: #fff;
  color: black;
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7b7f;
  }
`;
