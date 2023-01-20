import styled from 'styled-components'

export const FilterTruckCarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 24px 24px;
  gap: 10px;
  width: 100%;
  /* min-height: 651px; */
  border-radius: 16px;

  .filterSearchBox {
    display: flex;
    padding: 20px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 15px 60px rgba(11, 49, 82, 0.1);
    border-radius: 16px;
    height: 93px;
    align-items: center;

    .searchInputFilter {
      direction: rtl;
      position: relative;
      .ant-input-group-addon {
        border: 1px solid #fff !important;
      }
      .ant-btn {
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
        position: absolute;
        top: 9px;
        left: 7px;
      }

      input {
        border: 1px solid #b9bbc2;
        border-radius: 16px;
        height: 51px;
      }
    }
  }
  .filtersBox {
    width: 100%;
    height: 100%;

    .filterBox {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: flex-end;
      padding: 20px 10px;
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 16px;

      .formCheckBoxFilterItem {
        padding-top: 0;
        padding-bottom: 15px;
        width: 100%;
      }

      .ant-typography {
        display: block;
        width: 100%;
      }

      .ant-input-group-addon {
        background: none;
        border: none;
        box-shadow: none;
      }

      .ant-input-group .ant-input:hover,
      .ant-input-group .ant-input:focus {
        z-index: 0;
      }

      .formCheckBoxFilter {
        margin-top: 16px;
        width: 100%;

        .ant-checkbox-wrapper {
          direction: rtl;
          color: #909195;
        }
      }
      .formCheckBoxFilter-used {
        margin-top: 0;
      }
    }
  }

  .filter-icon-section {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .filter-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 93px;
    line-height: 93px;
    background-color: #fff;
    border-radius: 8px;
    padding: 8px;
  }

  .ant-input-group .ant-input {
    z-index: 0 !important;
  }

  .formCheckBoxFilter-group {
    padding-right: 10px;
    max-height: 248px;
    overflow-y: scroll;
    border-right: 1px solid #e7e7e7;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 0px 4px 4px;
    .filterSearchBox {
      padding: 8px;
      height: 70px;
    }
    .filter-icon {
      height: 70px;
    }
  }
`

export const FilterModalContent = styled.div`
  .formCheckBoxFilterItem {
    padding-bottom: 15px;
    width: 100%;
  }

  .formCheckBoxFilter-group {
    padding-right: 10px;
    height: 248px;
    overflow-y: scroll;
    border-right: 1px solid #e7e7e7;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .filterBox {
    margin-top: 2rem;
  }
`
