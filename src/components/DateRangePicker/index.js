import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import ArrowIcon from "./ArrowIcon"
import Bar from "./Bar"
import CalenDarIcon from "./CalendarIcon"
import Input from "./Input"
import Panel from "./Panel"

const Container = styled.div`
  position: relative;
  max-width: 20rem;
  height: 2rem;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
export const DateContext = React.createContext()

export default function () {
  const [firstDate, setFirstDate] = useState(null)
  const [secondDate, setSecondDate] = useState(null)
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState("l")
  const [closeBtn, setCloseBtn] = useState(false)

  const contextValue = { firstDate, setFirstDate, secondDate, setSecondDate, focus, setFocus, show, setShow }

  const picker = useRef()

  useEffect(() => {
    firstDate && secondDate && setShow(false)
  }, [firstDate, secondDate])

  useEffect(() => {
    window.onclick = (e) => {
      if (picker.current.contains(e.target) || !show) return
      setShow(false)
      setFocus("l")
      if (firstDate && secondDate) return
      setFirstDate(null)
      setSecondDate(null)
    }

    return () => (window.onclick = null)
  }, [show])

  const inputProps = { focus, setFocus, show }
  return (
    <Container
      ref={picker}
      onClick={() => setShow(true)}
      onMouseEnter={() => firstDate && secondDate && setCloseBtn(true)}
      onMouseLeave={() => setCloseBtn(false)}
    >
      <DateContext.Provider value={contextValue}>
        <Input start {...inputProps} />
        <ArrowIcon />
        <Input end {...inputProps} />
        <CalenDarIcon selected={false} closeBtn={closeBtn} />
        <Panel show={show} />
      </DateContext.Provider>
    </Container>
  )
}
