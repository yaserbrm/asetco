import styled from "styled-components";

export const UploadFileStyle = styled.div`
    padding-bottom:32px;
    .imageUploaded{
        width:96px;
        height:96px;
        border-radius:100%;
        background:red;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background: rgba(30, 25, 38, 0.02);
        .image{
            width:100%;
            height:100%;
            border-radius:100%;
            transition:0.2s;
            cursor: pointer;
        }
        .icon{
            width:50%;
            height:50%;
            cursor: pointer;
            
        }
    }
    .deleteButton{
        width: 60px ;
        height: 32px;
        display:inline-block;
        margin-right:8px;
        font-size:12px;
    }
    .chooseImageButton{
        width: 60px ;
        height: 32px;
        display:inline-block;
        font-size:12px;
        padding: 4px 8px;
    }
    .chooseImageButton>span,.deleteButton>span{
        font-size:12px !important;
    }
    .size ,.text{
        padding-bottom:8px;
    }
    .size,.format{
        display:flex;
        flex-direction:columns;
        color:#EF0000;
        line-height: 24px;
        text-align: right;
        font-size: 12px !important;
    }
    
    @media only screen and (max-width: 992px) {
        padding-bottom:0px;
        .size,.format{
            font-size: 12px;
        }
    }
    @media only screen and (max-width: 480px) {
        .imageUploaded{
            width:90px;
            height:90px;
        }
    }

`