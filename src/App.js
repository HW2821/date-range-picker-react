import "./App.css"
import styled from "styled-components"

import DateRangePicker from "./components/DateRangePicker"

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 2rem;
`

function App() {
  return (
    <Container>
      <DateRangePicker onChange={(arr) => console.log(arr)} />
    </Container>
  )
}

export default App
