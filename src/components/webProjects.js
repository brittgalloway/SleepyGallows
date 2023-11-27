import React, { useState } from 'react'
import styled from 'styled-components'
import AnimatedIcons from '../lottie/projectIcons'
import '../styles/webStyles.css'

const ProjectWrapper = styled("div")`
  cursor: pointer;
`
const H3 = styled("h3")`
  font-family: var(--webTitle)
`
const P = styled("p")`
  font-family: var(--webTitle)
`

const Project = styled("div")`
  border-radius: 15px;
  width: 45%;
  padding: 2rem;
  margin: 1rem;
  z-index: 20;
  position: fixed;
  top: 1%;
  right: 25%;
  background: #fff;
  box-shadow: 0 0 100px 70px var(--purple);
  @media (width <= 450px) {
    padding: 1rem;
    width: 90%;
    top:5%;
    right: 0;
  }
  `
  const Wrapper = styled("div")`
  border: 5px solid var(--light-green);
  border-radius: 15px;
  padding: 2rem;
  text-align: left;
  @media (width <= 450px) {
    padding: 1rem;
  }
`
const Img = styled("img")`
  object-fit: cover;
  width: 100%;
  border-radius: 15px;
  @media (width <= 450px) {
    display:none;
  }
`
const Close = styled("button")`
  border-radius: 50%;
  background: #F2C3D3;
  padding:15px;
  border: none;
  color: #fff;
  line-height: 0;
  position: absolute;
  top: -20px;
  right: -20px;
  cursor: pointer;
  @media (width <= 450px) {
    padding: 10px;
    top: -10px;
    right: -10px;
  }
`
const Button = styled("a")`
  display: inline-block;
  background: var(--light-purple);
  color: white;
  text-shadow: -1px -1px 0 var(--purple), 1px -1px 0 var(--purple), -1px 1px 0 var(--purple), 1px 1px 0 var(--purple);
  border: 1px solid var(--purple);
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  width: 40%;
  margin: 40px 20px 0 20px;
  &:hover {
    color: white;
    text-decoration: none;
    background: var(--purple);
  }
  @media (width <= 450px) {
    width: 100%;
    margin: 20px 0;
  }
`
const ButtonB = styled(Button)`
  background: #F2C3D3;
  text-shadow: -1px -1px 0 #A05770, 1px -1px 0 #A05770, -1px 1px 0 #A05770, 1px 1px 0 #A05770;
  &:hover {
    background: #A05770;
  }
  @media (width <= 450px) {
    margin: 0;
  }
`

const WebProjects = ({id, projectName, icon, screenshot, description, liveApp, github}) => {
  const [display, setDisplay] = useState(false);
  
  function handleClick() {
    display === true ? setDisplay(false) : setDisplay(true);
  }
  return (
    <>
      <ProjectWrapper key={id} onClick={handleClick}>
          <AnimatedIcons
            title={icon.title}
          />
          <H3>{projectName}</H3>
          <P>development & design</P>
      </ProjectWrapper>
      { display ? (
        <Project role="dialog" close={handleClick} aria-modal="true" key={projectName}>
          <Close onClick={handleClick}>
            <img alt="a white 'x' to close the popup/dialog" src="data:image/svg+xml,%3Csvg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'/%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E" />
          </Close>
          <Wrapper>
            <Img src={screenshot.url} />
            <h2>{projectName}</h2>
            <div dangerouslySetInnerHTML={{ __html: description }}/>
            <Button href={liveApp}>See it here</Button> 
            <ButtonB href={github}>Github</ButtonB>
          </Wrapper>
        </Project>
      ) : null }
    </>
  )
}
  
export default WebProjects
