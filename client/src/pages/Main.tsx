import SearchBox from '../components/main/SearchBox';
import LocationBox from '../components/main/LocationBox';
import FilterSearchBox from '../components/main/FilterSearchBox';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

const Main = () => {
  return (
    <S.Container>
      <SearchBox />
      <LocationBox />
      <FilterSearchBox />
    </S.Container>
  );
};

export default Main;
