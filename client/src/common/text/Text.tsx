import {COLOR_1} from "../common.tsx";
import styled from "styled-components";
import {CSSProperties} from "react";

export const FONT_STYLES = {
    maximum_30_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 30,
        lineHeight: 40,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    header_24_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    header_24_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    popup_20_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 20,
        lineHeight: 32,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    title_18_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 18,
        lineHeight: 30,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    title_18_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 18,
        lineHeight: 30,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    title_17_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '400',
        fontSize: 17,
        lineHeight: 28,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    title_17_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 17,
        lineHeight: 28,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    button1_18_medium: {
        fontFamily: 'Pretendard-SemiBold',
        // fontWeight: '600',
        fontSize: 18,
        lineHeight: 30,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    button2_15_medium: {
        fontFamily: 'Pretendard-SemiBold',
        // fontWeight: '600',
        fontSize: 15,
        lineHeight: 25,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    button3_12_medium: {
        fontFamily: 'Pretendard-SemiBold',
        // fontWeight: '600',
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    button4_10_medium: {
        fontFamily: 'Pretendard-SemiBold',
        // fontWeight: '600',
        fontSize: 10,
        lineHeight: 16,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body1_15_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 15,
        lineHeight: 25,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body1_15_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 15,
        lineHeight: 25,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body2_14_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: -0.4,
        color: COLOR_1.black,
    },
    body2_14_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body3_12_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 12,
        lineHeight: 22,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body3_12_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 12,
        lineHeight: 22,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body4_10_bold: {
        fontFamily: 'Pretendard-Bold',
        // fontWeight: '700',
        fontSize: 10,
        lineHeight: 15,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
    body4_10_regular: {
        fontFamily: 'Pretendard-Regular',
        // fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        letterSpacing: -0.2,
        color: COLOR_1.black,
    },
};

export type FontType =
    | 'title_17_bold'
    | 'title_17_regular'
    | 'header_24_bold'
    | 'header_24_regular'
    | 'maximum_30_bold'
    | 'popup_20_bold'
    | 'title_18_bold'
    | 'title_18_regular'
    | 'button1_18_medium'
    | 'button2_15_medium'
    | 'button3_12_medium'
    | 'button4_10_medium'
    | 'body1_15_bold'
    | 'body1_15_regular'
    | 'body2_14_bold'
    | 'body2_14_regular'
    | 'body3_12_bold'
    | 'body3_12_regular'
    | 'body4_10_bold'
    | 'body4_10_regular';

const Container = styled.div<{ type: FontType; color?: string }>`
  ${({ type }) => FONT_STYLES[type]};
  color: ${({ color }) => (color ? color : "black")};
`;

export const DgText = ({
                           type,
                           children,
                           style,
                           color,
                       }: {
    type: FontType;
    children: React.ReactNode;
    style?: CSSProperties;
    color?: string;
}) => (
    <Container type={type} style={style} color={color}>
        {children}
    </Container>
);
