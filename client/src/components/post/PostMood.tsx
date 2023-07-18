import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import MoodTag from '../../common/tags/MoodTag';
import { tagName } from '../../common/tagName';
import { PostItemAtom } from '../../recoil/postState';
import { ReqPostData } from '../../types/type';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';
import prepend from 'react-hook-form/dist/utils/prepend';

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

const PostMood = () => {
  const [postData, setPostData] = useRecoilState<ReqPostData>(PostItemAtom);

  const onClickEvent = (tagName: string): void => {
    // tags안에 tagname 존재하는지
    // 존재한다면 지워야되죠
    // 존재하지않는다면 tags.lenght >=3
    // 3개이상이면 return;
    // 미만 -=> 추가
    const tags = postData?.tags ?? [];
    const findTag = tags?.find((el) => el === tagName);
    if (findTag) {
      const list = tags.filter((el) => el !== findTag);
      setPostData((prevState) => ({ ...prevState, tags: list }));
      return;
    }

    if (tags.length >= 3) {
      alert('태그를 3개 이하로 선택하세요!');
      return;
    }
    setPostData((prevState) => ({ ...prevState, tags: [...tags, tagName] }));
  };

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
              onClickEvent={onClickEvent}
              selected={!!postData?.tags?.find((ele) => ele === el)}
            ></MoodTag>
          </S.TagWrap>
        ))}
      </S.MoodWrap>
    </>
  );
};

export default PostMood;
