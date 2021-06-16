import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;
  height: 100%;
`;
export const NavLayout = styled.div`
  width: 200px;
  border-right: 1px solid #d9d9d9;
  height: 100%;
  .ant-list-bordered {
    border: none;
  }
  .ant-list-item {
    display: block;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
`;
export const ConfigLayout = styled.div`
  height: 100%;
`;

export const ConfigPanelLayout = styled.div`
  padding: 10px;
  height: 100%;
`;
