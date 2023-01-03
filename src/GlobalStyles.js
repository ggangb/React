import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
.gnb, .header_top_cont, .header_search_cont, .main_goods_cont, .sub_content, .content_info, .foot_list ul, .foot_cont, .foot_certify {
    position: relative;
    width: 1200px;
    margin: 0 auto;
}

input[type="text"], input[type="password"] {
    height: 31px;
    padding: 0 5px;
    color: #333333;
    border: 1px solid #d6d6d6;
    line-height: 31px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

input[type="text"], input[type="password"] {
    padding: 0 10px;
    outline: none;
    font-size: 12px;
}

`;

export default GlobalStyles;
