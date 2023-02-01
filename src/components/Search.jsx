import { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = ({ setInputValue }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setInputValue(input);
    navigate(`/searched/${input}`);
    setInput('');
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <InputWrapper>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Search for a recipe"
          value={input}
        />
        <FaSearch />
      </InputWrapper>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
    border: 1px solid #9B9B9B;
    background: #FFFFFF;
    font-size: 1.2rem;
    color: #1C2331;
    border-radius: 2rem;
    outline: none;
    padding: 1rem 2rem;

  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.7;
  }
`;

export default Search;
