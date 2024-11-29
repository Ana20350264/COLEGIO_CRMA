import styled from 'styled-components';

export const FooterContainer = styled.div`
  background-color: #1f4ba7;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
  display: flex;               /* Utilizamos flexbox */
  justify-content: center;     /* Alineamos el contenido al centro */
  align-items: center;         /* Alineamos los elementos verticalmente */
  
  img {
    height: 50px;
    margin-right: 20px;        /* Agregamos margen entre el logo y el texto */
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
`;
