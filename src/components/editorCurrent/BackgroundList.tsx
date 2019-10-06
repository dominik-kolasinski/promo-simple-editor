import React, { useEffect } from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "styled-icons/material/Delete";
import { BackgroundRaw } from "../../state/ducks/editorCurrent/types";
import {
  fetchBackground,
  removeBackgroundImage
} from "../../state/ducks/editorCurrent/actions";
import { ApplicationState } from "../../state/ducks/index";
import BackgroundItem from "./BackgroundItem";
import LoadingSpinner from "../common/LoadingSpinner";
import StyledButton from "../common/StyledButton";

interface BackgroundListState {
  loading: boolean;
  images: any[];
  backgroundImageUrl: string | null;
}

const BackgroundList: React.FC = React.memo(() => {
  // const [term1, setTerm1] = useState("");
  // const [term2, setTerm2] = useState("");
  // const [termsStripped, setTermsStripped] = useState("");
  const dispatch = useDispatch();
  const state: BackgroundListState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      loading: editorCurrent.loading,
      images: editorCurrent.images,
      backgroundImageUrl: editorCurrent.workbenchBackground
    })
  );

  useEffect(() => {
    state.images.length < 4 && dispatch(fetchBackground());
  }, [dispatch, state.images.length]);

  // const handleChange = (
  //   e: React.FormEvent<HTMLInputElement>,
  //   termId: number
  // ) => {
  //   if (termId === 1) {
  //     setTerm1(e.currentTarget.value.trim());
  //   } else {
  //     setTerm2(e.currentTarget.value.trim());
  //   }
  // };

  // const handleSearchByTermClick = () => {
  //   const termsStripped = [term1, term2]
  //     .map(t => {
  //       return t.replace(/\s|[0-9_]|\W|[#$%^&*()]/g, "");
  //     })
  //     .filter(term => term.length);
  //   const termsPath =
  //     termsStripped.length === 2
  //       ? termsStripped[0] + "," + termsStripped[1]
  //       : termsStripped[0];

  //   dispatch(removeFetchedBackgrounds());
  //   dispatch(fetchBackground(termsPath));
  // };

  return (
    <StyledBackgroundListContainer>
      <span style={{ fontSize: "1.4rem" }}>Select background</span>
      {state.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <StyledBackgroundList>
            {state.images !== [] &&
              state.images.map((background: BackgroundRaw) => (
                <BackgroundItem key={uniqueId()} url={background.imageUrl} />
              ))}
          </StyledBackgroundList>
          <StyledButton
            disabled={!state.backgroundImageUrl}
            onClick={() => dispatch(removeBackgroundImage())}
            style={{ backgroundColor: "#12c2e9", width: "9rem" }}
          >
            <span>
              Remove&nbsp;&nbsp;
              <Delete size={14} />
            </span>
          </StyledButton>
        </>
      )}
      {/* <input
        type="text"
        placeholder="Term 1"
        value={term1}
        onChange={e => handleChange(e, 1)}
      />
      <input
        type="text"
        placeholder="Term 2"
        value={term2}
        onChange={e => handleChange(e, 2)}
      />
      <button onClick={handleSearchByTermClick}>Search by term</button> */}
    </StyledBackgroundListContainer>
  );
});

const StyledBackgroundListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19rem;
  height: 45rem;
  padding: 1.2rem;
  margin: 0 1.2rem;
  background: #fff;
  border: 0 solid rgba(0, 0, 0, 0.25);
  box-shadow: rgba(0, 0, 0, 0.25) 0 0.1rem 0.4rem;
  border-radius: 0.4rem;
`;

const StyledBackgroundList = styled.ul`
  list-style: none;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0.6rem 0 0.2rem 0;
`;

export default BackgroundList;
