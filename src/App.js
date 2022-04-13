import logo from "./logo.svg"
import "./App.css"
import styled from "styled-components"
import { DatePicker } from "antd"
import "antd/dist/antd.css"
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
      <DatePicker.RangePicker />
      <DateRangePicker />
    </Container>
  )
}

export default App
