import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { DateContext } from "."
import { format } from "date-fns"
const Container = styled.div`
  margin: 1rem;
  flex: 1;
  position: relative;
`

const Input = styled.input`
  all: unset;
  width: 100%;
`

const Bar = styled.div`
  position: absolute;
  width: 100%;
  top: 105%;
  height: 3px;
  background-color: #4bafbc;
  transform: translateX(${(p) => (p.focus === "l" ? "0" : "calc(100% + 3rem)")});
  transition: all 0.5s ease;
  display: ${(p) => !p.show && "none"};
`

export default function ({ hoverDate, start, end, bar, focus, setFocus, show }) {
  const [dateValue, setDateValue] = useState("")
  const { firstDate, secondDate } = useContext(DateContext)
  const inputRef = useRef()

  useEffect(() => {
    const inputValue = (start && firstDate) || (end && secondDate)
    setDateValue((inputValue && format(inputValue, "yyyy-MM-dd")) || "")
  }, [firstDate, secondDate])

  const handleFocus = () => {
    if (start) setFocus("l")
    else setFocus("r")
  }

  useEffect(() => {
    start && focus === "l" && inputRef.current.focus()
    end && focus === "r" && inputRef.current.focus()
  }, [focus])

  return (
    <Container>
      <Input
        ref={inputRef}
        onFocus={handleFocus}
        readOnly
        placeholder={hoverDate || (start && "Start Date") || (end && "End Date")}
        value={dateValue}
      />
      {start && <Bar focus={focus} show={show} />}
    </Container>
  )
}
