import React, { useEffect } from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundRaw } from "../../state/ducks/editorCurrent/types";
import {
  fetchBackground,
  removeBackgroundImage
} from "../../state/ducks/editorCurrent/actions";
import { ApplicationState } from "../../state/ducks/index";
import BackgroundItem from "./BackgroundItem";
import LoadingSpinner from "../common/LoadingSpinner";

interface BackgroundListState {
  loading: boolean;
  images: any[];
  backgroundImageUrl: string | null;
}

const BackgroundList: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const backgroundListState: BackgroundListState = useSelector(
    ({ editorCurrent }: ApplicationState) => ({
      loading: editorCurrent.loading,
      images: editorCurrent.images,
      backgroundImageUrl: editorCurrent.workbenchBackground
    })
  );

  useEffect(() => {
    backgroundListState.images.length < 4 && dispatch(fetchBackground());
  }, [backgroundListState.images.length, dispatch]);

  return (
    <StyledBackgroundListContainer>
      {backgroundListState.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h4>Select background</h4>
          <StyledBackgroundList>
            {backgroundListState.images.length &&
              backgroundListState.images.map((background: BackgroundRaw) => (
                <BackgroundItem key={uniqueId()} url={background.imageUrl} />
              ))}
          </StyledBackgroundList>
          <button
            disabled={!backgroundListState.backgroundImageUrl}
            onClick={() => dispatch(removeBackgroundImage())}
          >
            Remove background
          </button>
        </>
      )}
    </StyledBackgroundListContainer>
  );
});

const StyledBackgroundListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBackgroundList = styled.ul`
  list-style: none;
`;

export default BackgroundList;

// import React, { useEffect } from "react"
// import styled from "styled-components";
// import uniqueId from "lodash/uniqueId";
// import { useDispatch, useSelector } from "react-redux";
// import { BackgroundRaw } from "../../state/ducks/editorCurrent/types";
// import BackgroundItem from "./BackgroundItem";
// import LoadingSpinner from "../common/LoadingSpinner";;

// interface BackgroundListProps {
//   loading: boolean
//   images: any[]
//   fetchBackground(): void
//   removeBackgroundImage(): void,
//   backgroundImageUrl: string | null
// }

// const BackgroundList: React.FC<BackgroundListProps> = React.memo(({ loading, images, fetchBackground, removeBackgroundImage, backgroundImageUrl }: BackgroundListProps) => {

// 	useEffect(() => {
//         images.length < 4 && fetchBackground()
//     }, [fetchBackground, images.length, loading]);

// 	return (
// 		<StyledBackgroundListContainer>
//       { loading ?
//         <LoadingSpinner /> :
//           (<>
//             <h4>Select background</h4>
//             <StyledBackgroundList>
//               {images.length && images.map((background: BackgroundRaw) => (
//                 <BackgroundItem key={uniqueId()} url={background.imageUrl}/>
//               ))}
//             </StyledBackgroundList>
//             <button disabled={!backgroundImageUrl} onClick={() => removeBackgroundImage()}>remove bg</button>
//             </>
//           )
//       }
// 		</StyledBackgroundListContainer>
// 	);
// });

// const StyledBackgroundListContainer = styled.div`
//   display: flex;
//   flex-direction:column;
// `;

// const StyledBackgroundList = styled.ul`
//   list-style: none;
// `;

// export default BackgroundList;
