import React, { useContext } from "react"
import styled from "styled-components"
import { isSameDay, isSameMonth, format } from "date-fns"
import { DateContext } from "."

const Container = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;

  ${(p) =>
    p.today && {
      outline: "1.3px solid #298591",
      color: "#298591",
    }}

  color:${(p) => !p.inMonth && "#bdbdbd"};
`

export const Tile = ({ date, anchorDate, hoverDate, setHoverDate }) => {
  const { firstDate, setFirstDate, secondDate, setSecondDate, focus, setFocus } = useContext(DateContext)
  const handleClick = () => {
    if (focus === "l") {
      setFirstDate(date)
      if (!secondDate) setFocus("r")
    } else {
      setSecondDate(date)
      if (!firstDate) setFocus("l")
    }
  }

  const handleEnter = () => {}
  const handleLeave = () => {}

  const styleProps = {
    today: isSameDay(date, Date.now()),
    inMonth: isSameMonth(date, anchorDate),
  }
  return (
    <td>
      <Container {...styleProps} onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {format(date, "d")}
      </Container>
    </td>
  )
}
