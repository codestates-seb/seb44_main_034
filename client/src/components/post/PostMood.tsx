import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';
import MoodTag from '../../common/tags/MoodTag';
import { tagName } from '../../common/tagName';

const PostMood = () => {
  const [tag, setTag] = useState<string[]>([]);
  const [tagCount, setTagCount] = useState(0);
  const handleEvent = (e: any): void => {
    if (e.target.checked && tagCount >= 3) {
      e.preventDefault();
      alert('태그를 3개 이하로 선택하세요!');
      return;
    }
    if (e.target.checked && tagCount < 3) {
      setTagCount((prev) => prev + 1);
      setTag((prev) => [...prev, e.target.value]);
      console.log(e);
    } else {
      setTagCount((prev) => prev - 1);

      setTag(tag.filter((el) => el !== e.target.value));
    }
  };
  useEffect(() => {
    if (tagCount >= 4) {
      alert('태그를 3개 이하로 선택하세요!');
    }
  }, [tagCount]);

  return (
    <>
      <S.MoodAskWrap>
        <S.MoodAsk>카페 분위기는 어떠셨나요?</S.MoodAsk>
      </S.MoodAskWrap>
      <S.MoodWrap>
        {tagName.map((el, id) => (
          <S.TagWrap key={id}>
            <MoodTag
              text={el}
              id={id.toString()}
              handleEvent={handleEvent}
            ></MoodTag>
          </S.TagWrap>
        ))}
      </S.MoodWrap>
    </>
  );
};
const S = {
  MoodAskWrap: styled.div`
    text-align: left;
  `,
  MoodAsk: styled.span`
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  MoodWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  TagWrap: styled.div`
    margin: 8px 4px;
  `,
};

export default PostMood;
