import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;
  height: 100%;
`;
export const NavLayout = styled.div`
  width: 200px;
  border-right: 1px solid #d9d9d9;
  height: 100%;
  .ant-list {
    height: calc(100% - 56px);
    overflow-y: auto;
    padding-top: 5px;
    button {
      padding: 0 3px;
    }
  }
  .active,
  .ant-list-item:hover {
    color: #1890ff;
  }
  .ant-list-item.active {
    background-color: #e6f7ff;
    &::before {
      transform: scale(1, 1);
    }
  }
  .ant-list-bordered {
    border: none;
  }
  .ant-list-item {
    position: relative;
    display: block;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .del-btn {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background-color: #1890ff;
      transform: scale(0, 0);
      transition: all 0.3s;
    }
  }
`;
export const ConfigLayout = styled.div`
  height: 100%;
  width: calc(100% - 200px);
`;

export const ConfigPanelLayout = styled.div`
  padding: 10px;
  height: 100%;
`;

export const BtnLayout = styled.div`
  text-align: center;
  button {
    margin: 0 5px;
    width: 169px;
  }
`;
