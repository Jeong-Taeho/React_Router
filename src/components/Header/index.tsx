import { Page } from "../../pages/NavigationPage";
import styled from "@emotion/styled";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface Props {
  prevPage: Page;
  currentPage: Page;
  onPrevClick: () => void;
}

const Header = ({ prevPage, currentPage, onPrevClick }: Props) => {
  return (
    <NavContainer className='Header'>
      {prevPage && (
        <button
          onClick={onPrevClick}
          className='nextBtn'>
          {"<"} {prevPage.title}
        </button>
      )}
      <TransitionGroup className='header-title'>
        <CSSTransition
          classNames='fade'
          key={currentPage.title}
          timeout={700}>
          <p className='main-title'>{currentPage.title}</p>
        </CSSTransition>
      </TransitionGroup>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  width: inherit;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid;
  font-weight: bold;
  font-size: 36px;
  position: relative;

  .header-title {
    display: flex;
    align-items: center;
  }

  .nextBtn {
    margin-left: 15px;
  }

  .main-title {
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 36px;
  }
`;

export default Header;
