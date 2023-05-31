import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import './App.css';

function App() {

  const [dataCard, setDataCard] = useState([]);
  const [visible, setVisible] = useState(5)
////get data
  const allDataCard = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=35");
    setDataCard(response.data.results)
  }
///loading more data
  const loadingMore = () => {
    setVisible(visible + 5)
  }
  useEffect(() => {
    allDataCard()
  },[]);
 
//// rendered card 
const renderedCard = (p, index) => {
  return(
    <Card style={{width:"18rem",backgroundColor:"#F5F5F5", borderRadius:"10px"}} key={index}>
      <Card.Img variant="top" src={p.picture.large} />
      <Card.Body>
        <Card.Title>
          {p.name.first} {p.name.last}
        </Card.Title>
        <Card.Text>
          {p.location.city}, {p.location.state}, {p.location.country}
        </Card.Text>
        <Card.Text>
          <ul>
            <li>{p.email}</li>
            <li>{p.cell}</li>
            <li>{p.gender}</li>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

  return (
    <div className="App">
      <div className="wrapper">
        <div className="cards">
          {dataCard.slice(0, visible).map(renderedCard)}
        </div>
      </div>
      {visible < dataCard.length && (
        <button onClick={loadingMore}>Load 5 more</button>
      )}
    </div>
  );
}

export default App;
