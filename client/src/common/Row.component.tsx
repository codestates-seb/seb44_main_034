import styled from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "./common.tsx";
import { CSSProperties } from "react";


const Row = styled.div`
  display: flex;
`;

const AlignedRow = styled(Row)`
  align-items: center;
`;

const CenteredRow = styled(Row)`
  justify-content: center;
`;

const SpacedRow = styled(Row)`
  justify-content: space-between;
`;

