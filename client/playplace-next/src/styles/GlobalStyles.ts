import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { notoSansKR } from './GlobalFonts';

export const GlobalStyles = createGlobalStyle`
    ${reset};
    
    :root {
        /* color */

        /* radius */
        --radius-s : 5px;
        --radius-m : 10px;
        --radius-l : 99px;

        /* width */
        --content-width-xs : 250px;
        --content-width-s : 512px;
        --content-width-m : 756px;
        --content-width-l : 1024px;
        --content-width-xl : 1280px;
        --content-width-full : 100%;
    }

    body{
        font-family: ${notoSansKR.style.fontFamily};
        padding: 0;
        margin: 0;
        font-weight: normal;
        position: relative;
        line-height: normal;
    };

    // 스크롤 바
    &::-webkit-scrollbar {
    } 

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 18px;
        vertical-align: baseline;
    }

    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;
