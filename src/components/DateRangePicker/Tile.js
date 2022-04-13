import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { isSameDay, isSameMonth, format, compareDesc, compareAsc } from "date-fns"
import { DateContext } from "."

const Container = styled.td`
  position: relative;
  flex: 1;
  font-weight: normal;
  display: flex;
  place-content: center;
  cursor: ${(p) => (p.disable ? "auto" : "pointer")};
  padding: 0.25rem;
`

const InnerTile = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;

  ${(p) =>
    (p.isToday && {
      outline: "1.3px solid #298591",
      color: "#298591",
    }) ||
    (p.selected && {
      backgroundColor: "teal",
      color: "white",
    })}

  color:${(p) => !p.inMonth && "#bdbdbd"};

  &:hover {
    background-color: #eaeaeac3;
    background-color: ${({ selected }) => selected && "#5ca2ab"};
  }
`

const CoverTile = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  background-color: #d7d7d76c;
  display: none;
  display: ${(p) => p.disable && "block"};
`

export const Tile = ({ date, anchorDate, changeDate }) => {
  const [selected, setSelected] = useState(false)
  const [isToday, setIsToday] = useState()
  const [inMonth, setInMonth] = useState()
  const [disable, setDisable] = useState()
  const { firstDate, setFirstDate, secondDate, setSecondDate, focus, setFocus, setHoverDate } = useContext(DateContext)

  const styleProps = { isToday, inMonth, selected }

  const handleClick = () => {
    if (disable) return
    if (focus === "l") {
      setFirstDate(date)
      if (!secondDate) setFocus("r")
    } else {
      setSecondDate(date)
      if (!firstDate) setFocus("l")
    }
    if (inMonth) return
    if (compareAsc(date, anchorDate) < 0) changeDate.addOneMonth()
    else changeDate.subOneMonth()
  }

  const handleEnter = () => {
    if (disable) return
    setHoverDate(format(date, "yyyy-MM-dd"))
  }
  const handleLeave = () => {
    if (disable) return
    setHoverDate(null)
  }

  useEffect(() => {
    setIsToday(isSameDay(date, Date.now()))
    setInMonth(isSameMonth(date, anchorDate))
  }, [date, anchorDate])

  useEffect(() => {
    setSelected(inMonth && (isSameDay(date, firstDate) || isSameDay(date, secondDate)))
    if (compareAsc(date, firstDate) < 0 || compareAsc(date, secondDate) > 0) setDisable(true)
    else setDisable(false)
  }, [firstDate, secondDate, inMonth, anchorDate])

  return (
    <Container onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={handleClick} disable={disable}>
      <InnerTile {...styleProps}>{format(date, "d")}</InnerTile>
      <CoverTile disable={disable} />
    </Container>
  )
}
