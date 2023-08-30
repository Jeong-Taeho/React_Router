import useSessionStorage from "../hook/useSessionStorage";
import Header from "../components/Header";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "@emotion/styled";
import { useState } from "react";

export interface Page {
  title: string;
  screen: string;
  content: string;
}

const NavigationPage = ({ pages }: { pages: Page[] }) => {
  const [pageHistory, setPageHistory] = useSessionStorage<number[]>("pageHistoryIndex", [0]);
  const [direction, setDirection] = useState("right");
  const currentPageIndex = pageHistory[pageHistory.length - 1];
  const currentPage = pages[currentPageIndex];
  const prevPage = pages[currentPageIndex - 1];

  const handleNextClick = () => {
    const nextPageIndex = currentPageIndex + 1;
    if (pages.length > nextPageIndex) {
      setDirection("right");
      setTimeout(() => {
        setPageHistory([...pageHistory, nextPageIndex]);
      }, 0);
    }
  };

  const handlePrevClick = () => {
    if (pageHistory.length > 1) {
      const newHistory = pageHistory.slice(0, -1);
      setDirection("left");
      setTimeout(() => {
        setPageHistory(newHistory);
      }, 0);
    }
  };

  return (
    <div>
      <Header
        prevPage={prevPage}
        currentPage={currentPage}
        onPrevClick={handlePrevClick}
      />
      <TransitionGroup className='content-screen'>
        <CSSTransition
          key={currentPageIndex}
          classNames={direction}
          timeout={300}
          unmountOnExit>
          <ContentBox>
            <ContentList>
              <li key={currentPageIndex}>{currentPage.screen}</li>
              <button
                onClick={handleNextClick}
                className='next-btn'
                disabled={currentPageIndex === pages.length - 1}>
                {currentPage.content}
              </button>
            </ContentList>
          </ContentBox>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 576px;
  height: inherit;
  position: absolute;
`;

const ContentList = styled.ul`
  font-size: 36px;
  font-weight: bold;
  text-align: center;

  .next-btn:disabled {
    color: rgba(255, 0, 0, 0.2);
  }
`;

export default NavigationPage;
