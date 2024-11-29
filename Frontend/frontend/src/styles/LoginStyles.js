import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #678edc; 
  position: relative;
  overflow: hidden;
`;

export const Circle = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  background: ${({ color }) => color || '#e74c3c'}; /* Cambiado a rojo */
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  &:nth-child(1) {
    top: -80px;
    left: -120px;
  }
  &:nth-child(2) {
    bottom: -100px;
    right: -130px;
  }
`;

export const FormWrapper = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 400px;
  z-index: 2;
  backdrop-filter: blur(10px);
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  color: #292837;
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
  color: #292837;
  font-size: 16px;
  letter-spacing: 0.5px;
  display: block;
`;

export const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.4);
  color: #292837;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #3498db;
    background-color: rgba(255, 255, 255, 0.5);
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #221b85; 
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #1f639b;
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 20px;
`;

export const PopupMessage = styled.div`
  position: absolute;
  bottom: 65px;
  margin-top: 20px;
  background-color: #e74c3c;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;

  button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-left: 15px;
  }
`;

export const EyeIcon = styled.span`
  position: absolute;
  padding-bottom: 20px;
  right: 15px;
  top: 20%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
`;
