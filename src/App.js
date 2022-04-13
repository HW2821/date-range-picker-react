import "./App.css"
import styled from "styled-components"

import DateRangePicker from "./components/DateRangePicker"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
`

function App() {
  return (
    <Container>
      <DateRangePicker onChange={(arr) => console.log(arr)} />
    </Container>
  )
}

export default App
