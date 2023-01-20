import styled from 'styled-components'

export const OwnerFormOrderWrapper = styled.div`
  min-height: calc(100vh - 184px);
  line-height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 24px;

  .ownerForm {
    width: 100%;
    border: solid 1px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    padding: 32px;

    @media only screen and (max-width: 407px) {
      padding: 20px;
    }
  }
  .ownerFormRow {
    margin-top: 25px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 20px 32px;
    border-radius: 10px;

    @media only screen and (max-width: 420px) {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .ownerFormTitle {
    height: 41px;
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 36px;
    text-align: right;
    color: #1e1926;
    margin-top: 10px;
  }

  .car-form-description {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    color: #909195;
    margin-top: 8px;
  }
  .new-car-box {
    margin-top: 56px;
  }
  .new-car-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    width: 119px;
    height: 44px;
    background: #e7e7e7;
    border-radius: 4px;
  }
  .select-car-box {
    margin-top: 35px;
    .ant-form-item-control-input {
      width: 50% !important
      ;
    }
  }
  .select-car-title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    color: #1e1926;
    margin-left: 40px;
  }
  .form-align-select-input {
    margin-top: 9px;
  }
  /* .owner-form-input {
    text-align: right;
    border-radius: 8px;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #E7E7E7;
    box-shadow: none;
  } */
  .owner-form-input {
    border: unset;
    border-radius: 0;
    border-bottom: 2px solid #e7e7e7;
    transition: 0.3s all;
    padding-right: 0;
    .ant-select-selector {
      border: unset !important;
      border-radius: 0 !important;
      transition: 0.3s all !important;

      .ant-select-selection-placeholder {
        padding-right: 0;
      }
    }
  }
  .owner-form-input:focus {
    border: unset;
    border-bottom: 2px solid #e7e7e7;
    border-color: #7fb8e9;
    .ant-select-selector:focus {
      border: unset !important;
      border-color: #7fb8e9 !important;
    }
  }
  .owner-form-input:hover {
    border: unset;
    border-bottom: 2px solid #e7e7e7;
    background: #fff;
    border-color: #7fb8e9;
    .ant-select-selector:hover {
      border: unset !important;
      background: #fff !important;
      border-color: #7fb8e9 !important;
    }
  }
  .ant-form-item-control-input .ant-form-item-control-input-content:focus,
  .ant-form-item-control-input .ant-form-item-control-input-content:active {
    border: none;
    border-bottom: 1px solid #e7e7e7;
    box-shadow: none;
  }
  .ant-select-arrow {
    right: unset;
    left: 10px;
    top: 55%;
    color: rgba(0, 0, 0, 0.6);
  }
  .ant-form-item-label {
    text-align: right;
  }
  .ant-select-selector,
  .ant-select-open .ant-select-selector {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    box-shadow: none !important;
  }
  .steps-action {
    display: flex;
    margin-top: 30px;
    .icon {
      font-size: 15px;
      margin-left: 5px;
    }
  }
  .cancel,
  .back,
  .nextPage {
    direction: rtl;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 33px;
    border-radius: 8px;
    margin-right: 8px;
  }

  .cancel,
  .back {
    background-color: #f4f3f7;
  }
  .nextPage {
    background-color: #188aec;
    &.ant-btn[disabled] {
      color: #fff;
    }
  }
  .back-responsive {
    display: none;
  }
  .date-input {
    width: 100%;
    input {
      height: 32px;
    }
  }
  .attach-item-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    text-align: right;
    color: rgba(0, 0, 0, 0.6);
  }
  .attach-item- {
    border: solid 1px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
  }
  .select-car-dropdown {
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    width: 40%;
  }

  .inputCode {
    margin-top: 15px;
  }

  .resent-time-container {
    min-height: 30px;
    height: 30px;
    max-height: 30px;
  }

  .LoginActiveCodeFormResend {
    display: flex;
    justify-content: space-between;
  }

  .FormSubmit {
    min-height: 60px;
    border-radius: 8px;
    font-size: 20px;
    line-height: normal;
    min-height: 60px;
  }
  .MobileFormSubmit {
    margin-top: 40px;
  }
  .CodeFormSubmit {
    margin-top: 20px;
  }

  .active-code-input {
    text-align: center;
    border-radius: 8px;
  }

  .active-code-resend-link {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #000000;
  }

  .form-item {
    min-height: 70px;
    height: 70px;
    max-height: 70px;
    direction: rtl;
  }

  .disabled-link {
    pointer-events: none;
    color: rgba(0, 0, 0, 0.3);
  }

  .input-prefix {
    color: rgb(158, 158, 158);
    padding: 0 0 0 6px;
  }
  .error {
    position: relative;
    top: -15px;
    color: red;
  }
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: inline-block;
    margin-right: 4px;
    font-size: 14px;
    line-height: 1;
    content: ' ';
  }
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    line-height: 1;
    content: '*';
  }
  .docTypeFormItem {
    .ant-form-item-label {
      padding-bottom: 6px !important;
    }
  }
  .ant-form-item-label {
    label {
      color: rgba(192, 192, 192, 1);
    }
  }

  .ant-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-btn-loading-icon {
      margin-left: 5px;
    }
  }
  @media only screen and (max-width: 768px) {
    .back {
      display: none;
    }
    .title-responsive {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .back-responsive {
      display: block;
      color: #000;
    }
  }
  @media only screen and (max-width: 407px) {
    .ownerFormTitle {
      font-size: 16px;
    }
  }
`
export const ElHTM = `<div><?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="100%" height="100%" viewBox="0 0 1920.000000 1920.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1920.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M9300 15419 c-568 -73 -1044 -389 -1403 -930 -298 -451 -523 -1094
-627 -1794 -40 -270 -38 -391 16 -780 86 -616 265 -1216 484 -1618 33 -60 62
-117 65 -127 15 -46 -17 -60 -800 -354 l-761 -285 -379 -3 -380 -3 -56 -26
c-69 -32 -132 -88 -165 -146 -57 -96 -54 52 -54 -2550 l0 -2403 -179 0 c-205
0 -211 -2 -211 -73 0 -67 27 -176 56 -224 57 -97 164 -170 283 -193 79 -15
8651 -14 8723 1 130 27 237 108 289 217 26 54 33 82 37 155 4 79 3 92 -13 104
-14 10 -64 13 -197 13 l-178 0 -2 2433 -3 2432 -27 56 c-35 70 -103 138 -177
175 l-56 29 -340 5 -340 5 -760 288 c-418 158 -776 295 -795 304 -56 29 -52
53 33 221 220 430 374 959 461 1580 57 406 57 515 0 862 -152 918 -496 1678
-963 2122 -297 283 -632 446 -1034 503 -111 16 -436 18 -547 4z m916 -2629
c352 -55 663 -104 693 -110 44 -8 65 -20 117 -66 57 -50 64 -60 64 -94 0 -36
-2 -38 -51 -59 l-52 -21 -1381 1 c-1609 0 -1462 -10 -1484 104 -8 37 -10 71
-5 75 4 4 58 24 118 44 95 33 189 50 700 131 325 51 602 93 616 94 14 1 314
-44 665 -99z m-1948 -469 c8 -5 43 -77 77 -162 62 -152 63 -154 101 -166 64
-20 823 -153 840 -146 19 7 27 23 124 258 46 110 87 206 93 213 7 9 38 12 110
10 l101 -3 95 -229 c61 -145 104 -234 117 -242 18 -12 46 -9 210 20 104 19
293 53 419 76 163 29 235 46 246 58 9 9 40 77 69 150 29 72 58 139 64 147 6 8
37 26 69 40 55 24 57 24 57 5 0 -37 -120 -735 -141 -820 -128 -514 -443 -932
-850 -1125 -250 -118 -527 -137 -783 -54 -200 65 -352 163 -526 338 -175 176
-286 348 -383 596 -62 157 -95 301 -157 670 -33 198 -63 372 -66 388 l-6 27
53 -21 c29 -11 60 -24 67 -28z m5343 -2889 c55 -27 113 -83 142 -137 l22 -40
3 -2427 2 -2428 -4235 0 -4235 0 0 2398 c0 2634 -4 2452 60 2540 33 46 89 87
147 108 32 11 693 13 4043 11 l4005 -2 46 -23z m-4805 -5134 c13 -42 47 -80
88 -99 39 -17 78 -19 666 -19 588 0 627 2 666 19 41 19 75 57 88 99 l7 22
1926 0 1925 0 -7 -52 c-3 -29 -20 -81 -36 -115 -24 -49 -42 -71 -87 -103 -31
-22 -79 -47 -107 -55 -44 -13 -597 -15 -4405 -13 l-4355 3 -61 28 c-107 50
-171 137 -181 247 l-6 60 1936 0 1936 0 7 -22z"/>
<path d="M5472 9228 c-15 -15 -17 -4574 -2 -4598 8 -13 473 -15 4065 -18 2794
-1 4062 1 4076 8 19 11 19 42 17 2313 l-3 2302 -4070 3 c-3158 1 -4074 -1
-4083 -10z m4308 -418 c0 -39 -11 -41 -195 -38 -135 3 -150 5 -153 21 -9 45
-2 47 178 47 l170 0 0 -30z m2944 24 c9 -3 13 -10 10 -15 -7 -11 -1624 -12
-1624 -1 0 5 3 12 7 15 8 9 1585 9 1607 1z m-4124 -129 l0 -65 -130 0 -130 0
0 65 0 65 130 0 130 0 0 -65z m-1050 -35 l0 -30 -230 0 -230 0 0 30 0 30 230
0 230 0 0 -30z m3700 -150 l0 -40 -350 0 -350 0 0 40 0 40 350 0 350 0 0 -40z
m-1492 -16 c46 -9 118 -35 178 -64 182 -88 319 -244 387 -438 25 -72 31 -107
35 -205 3 -69 0 -142 -7 -177 -12 -59 -11 -62 21 -127 28 -57 33 -78 33 -138
-1 -122 -64 -219 -176 -270 -54 -24 -71 -27 -133 -22 -39 2 -80 8 -91 13 -17
7 -15 3 8 -25 48 -57 48 -123 1 -174 -49 -53 -110 -61 -168 -22 l-36 24 -36
-24 c-45 -30 -82 -32 -134 -5 l-40 20 -40 -20 c-52 -27 -89 -25 -134 5 l-36
24 -37 -25 c-67 -45 -148 -20 -189 58 -27 52 -10 116 40 156 35 27 24 31 -37
15 -98 -26 -212 5 -285 80 -93 96 -115 231 -54 346 29 56 31 64 22 112 -6 29
-10 93 -10 143 0 289 161 546 423 675 57 28 133 57 172 65 93 19 228 20 323 0z
m3100 -6 c3 -17 -13 -18 -227 -18 -186 0 -231 3 -231 13 0 8 3 17 7 21 4 3
106 5 227 4 201 -3 221 -5 224 -20z m-5928 -238 c0 -20 -7 -20 -405 -20 -398
0 -405 0 -405 20 0 20 7 20 405 20 398 0 405 0 405 -20z m6140 -110 c0 -6
-119 -10 -336 -10 -221 0 -333 3 -329 10 4 6 127 10 336 10 213 0 329 -4 329
-10z m-5220 -85 l0 -35 -215 0 -215 0 0 35 0 35 215 0 215 0 0 -35z m4310
-165 l0 -40 -402 2 -403 3 -3 38 -3 37 405 0 406 0 0 -40z m-3762 -277 l3 -53
-170 0 -171 0 0 55 0 55 168 -2 167 -3 3 -52z m-1198 32 c0 -13 -34 -15 -244
-15 -208 0 -245 2 -250 15 -5 13 26 15 244 15 216 0 250 -2 250 -15z m3730
-60 l0 -25 -110 0 -110 0 0 25 0 25 110 0 110 0 0 -25z m1890 -265 c0 -20 -7
-20 -360 -20 -353 0 -360 0 -360 20 0 20 7 20 360 20 353 0 360 0 360 -20z
m-5270 -100 c0 -7 -322 -10 -945 -10 -623 0 -945 3 -945 10 0 7 322 10 945 10
623 0 945 -3 945 -10z m4180 -45 l0 -55 -240 0 -240 0 0 48 c0 27 3 52 7 55 3
4 111 7 240 7 l233 0 0 -55z m-3099 -81 c40 -20 87 -80 95 -120 4 -19 4 -59 1
-87 l-7 -52 441 -192 440 -193 157 69 c158 70 317 140 579 254 l142 61 -6 63
c-12 125 64 215 182 216 154 2 248 -177 155 -296 -11 -14 -20 -27 -20 -30 0
-2 18 -7 41 -10 92 -12 159 -91 159 -187 0 -166 -196 -252 -313 -137 -17 18
-37 41 -43 51 -10 19 -27 12 -302 -109 -161 -70 -292 -131 -292 -134 0 -4 447
-204 581 -259 4 -2 17 13 28 32 31 50 117 91 175 83 98 -14 166 -89 166 -186
0 -103 -78 -191 -170 -191 -16 0 -30 -2 -30 -5 0 -2 11 -20 24 -40 39 -57 43
-113 13 -178 -56 -122 -197 -151 -297 -61 -21 20 -44 51 -51 71 -11 34 -8 111
5 143 4 11 -2 19 -21 26 -16 7 -214 93 -441 193 -227 99 -416 181 -421 181
-10 0 -693 -296 -819 -355 -66 -31 -72 -36 -62 -54 14 -28 13 -105 -4 -144 -7
-18 -29 -46 -49 -64 -114 -100 -274 -45 -311 109 -8 37 8 105 33 139 27 36 26
39 -4 39 -32 0 -93 25 -118 48 -59 53 -74 157 -34 233 27 50 107 99 161 99 51
0 130 -43 155 -84 13 -20 24 -36 25 -36 2 0 92 40 202 88 109 49 241 106 291
128 51 21 93 42 93 45 0 7 -579 263 -583 258 -59 -88 -120 -124 -197 -117 -99
10 -170 88 -170 188 0 98 69 177 165 187 l45 6 -25 29 c-85 101 -31 257 103
298 32 10 97 3 133 -16z m-1501 -329 l0 -55 -240 0 -240 0 0 55 0 55 240 0
240 0 0 -55z m4600 -30 l0 -25 -165 0 -165 0 0 25 0 25 165 0 165 0 0 -25z
m1424 -31 c9 -3 16 -12 16 -20 0 -11 -29 -14 -155 -14 -122 0 -155 3 -155 13
0 8 3 17 7 20 8 9 266 9 287 1z m-5470 -450 c9 -3 16 -17 16 -30 l0 -24 -225
0 -225 0 0 30 0 30 209 0 c115 0 216 -3 225 -6z m5150 -120 c24 -6 27 -10 24
-43 l-3 -36 -345 0 -345 0 -1 35 c0 19 0 38 2 41 5 8 635 12 668 3z m-5204
-389 c0 -13 -98 -15 -825 -15 -727 0 -825 2 -825 15 0 13 98 15 825 15 727 0
825 -2 825 -15z m5000 -270 c0 -13 -75 -15 -615 -15 -540 0 -615 2 -615 15 0
13 75 15 615 15 540 0 615 -2 615 -15z m-4140 -425 c0 -20 -7 -20 -395 -20
-388 0 -395 0 -395 20 0 20 7 20 395 20 388 0 395 0 395 -20z m2860 0 c0 -20
-7 -20 -390 -20 -383 0 -390 0 -390 20 0 20 7 20 390 20 383 0 390 0 390 -20z"/>
<path d="M9260 8057 c-111 -58 -155 -222 -84 -307 55 -65 148 -62 226 8 51 46
77 102 78 165 0 130 -106 194 -220 134z"/>
<path d="M9793 8060 c-44 -26 -63 -68 -63 -137 0 -46 6 -69 30 -110 97 -169
306 -137 304 47 -1 152 -159 269 -271 200z"/>
<path d="M9584 7672 c-16 -10 -104 -168 -104 -186 0 -26 35 -36 120 -36 85 0
120 10 120 36 0 18 -76 158 -97 179 -16 17 -23 18 -39 7z"/>
</g>
</svg>
</div>`
