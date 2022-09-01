import type { FC } from "react"

import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"

import { SettingsIcon } from "../assets/SettingsIcon"
import {
  devToolsOpenState,
  devToolsSearchState,
  recoilDevToolsSettingsState,
} from "../state/storage"
import { numberToHex } from "../utils/color"
import { recoilDevToolSettingsOpenState } from "./Settings"

const Header = styled.div<{ headerTransparency: number; fontSize: number }>`
  box-sizing: border-box;
  position: absolute;
  height: 40px;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 20002;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme, headerTransparency }) =>
    theme.headerBackground + numberToHex(headerTransparency)};
  box-shadow: 0px 0px 10px 0px #00000030;
  backdrop-filter: blur(30px);
  padding: 30px 10px;
  input {
    box-sizing: border-box;
    flex-shrink: 0;
    height: 40px;
    width: calc(100% - 100px);
    padding: 5px 15px;
    border: 1px solid ${({ theme }) => theme.faintOutline};
    background: none;
    border-radius: 7px;
    font-size: 20px;
    color: ${({ theme }) => theme.text};
    font-size: ${({ fontSize }) => fontSize}px;
    ::placeholder {
      color: ${({ theme }) => theme.faintText};
    }
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.iconBackground}b3;
    color: ${({ theme }) => theme.faintText};
    :hover {
      background-color: ${({ theme }) => theme.iconBackground}e6;
    }
    path {
      stroke: ${({ theme }) => theme.faintText};
    }
  }
`

export const searchIsFocusedState = atom({
  key: `searchIsFocused`,
  default: false,
})

const DevtoolsHeader: FC = () => {
  const setSettingsOpen = useSetRecoilState(recoilDevToolSettingsOpenState)
  const { transparency, fontSize } = useRecoilValue(recoilDevToolsSettingsState)
  const setIsOpen = useSetRecoilState(devToolsOpenState)
  const [userInput, setUserInput] = useRecoilState(devToolsSearchState)
  const setSearchIsFocused = useSetRecoilState(searchIsFocusedState)
  const headerTransparency = transparency > 0.3 ? transparency + 0.3 : 0.4
  return (
    <Header headerTransparency={headerTransparency} fontSize={fontSize}>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value.toLowerCase())}
        placeholder="Search"
        onFocus={() => setSearchIsFocused(true)}
        onBlur={() => setSearchIsFocused(false)}
      />
      <div
        title="Settings"
        onClick={() => setSettingsOpen((prev: boolean) => !prev)}
      >
        <SettingsIcon />
      </div>
      <div title="Close" onClick={() => setIsOpen(false)}>
        <i>x</i>
      </div>
    </Header>
  )
}

export default DevtoolsHeader
