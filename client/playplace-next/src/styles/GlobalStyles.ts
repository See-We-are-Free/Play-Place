import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import notoSansKR from './GlobalFonts';

const GlobalStyles = createGlobalStyle`
    ${reset};
    
    :root {
        /* color */
        --primary-grandiant-main: linear-gradient(90deg, #FEAC5E 0%, #C779D0 25.52%, #4BC0C8 100%);
        --primary-grandiant-sub-orange: linear-gradient(90deg, #FEAC5E 0%, #C779D0 100%);
        --primary-grandiant-sub-puple: linear-gradient(90deg, #A62AEC 0%, #8527F2 48.33%, #7125F6 100%);
        --primary-orange: #FEAC5E;
        --primary-purple: #C779D0;
        --primary-mint: #4BC0C8;
        --bottom-shadow: linear-gradient(180deg, rgba(0, 0, 0, 0) 60.07%, rgba(34, 34, 34, 0.8) 100%);
        
        --bg-black-alpa-25: rgba(0, 0, 0, 0.25);
        --bg-black-alpa-50: rgba(0, 0, 0, 0.50);
        --bg-black-alpa-75: rgba(0, 0, 0, 0.75);

        --white: #fff;
        --white-100: #F1F1F1;
        --white-200: #E2E2E2;
        --white-300: #D4D4D4;
        --white-400: #C5C5C5;
        --white-500: #B7B7B7;
        --white-600: #929292;
        --white-700: #6E6E6E;
        --white-800: #494949;
        --white-900: #252525;

        --black: #222;
        --black-100: #D4D4D4;
        --black-200: #AAAAAA;
        --black-300: #7F7F7F;
        --black-400: #545454;
        --black-500: #2A2A2A;
        --black-600: #222222;
        --black-700: #191919;
        --black-800: #111111;
        --black-900: #080808;

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
        
        /* z-index */
        --zindex-dropdown: 1000;
        --zindex-sticky: 1020;
        --zindex-fixed: 1030;
        --zindex-modal-backdrop: 1050;
        --zindex-modal: 1055;
        --zindex-popover: 1070;
        --zindex-tooltip: 1080;
        --zindex-toast: 1090;
        --zindex-header: 999;
    }

    body{
        font-family: ${notoSansKR.style.fontFamily};
        padding: 0;
        margin: 0;
        font-weight: normal;
        position: relative;
        line-height: normal;
        background: var(--black-700);
        color: var(--white-100);
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
        color: var(--white-100);
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

export default GlobalStyles;
