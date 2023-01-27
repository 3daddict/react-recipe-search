import { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <FaSearch />
      <input onChange={(e) => setInput(e.target.value) } type="text" placeholder="Search for a recipe" value={input} />
    </FormStyle>
  )
}

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 2rem 0;

  input {
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.2rem;
    color: #FFF;
    border: none;
    border-radius: 2rem;
    outline: none;
    padding: 1rem 3rem;

  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: #FFF;
  }
`


export default Search
