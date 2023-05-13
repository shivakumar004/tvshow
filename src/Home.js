import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";


const Home = () => {
  const [data, setData] = useState([]);


  /**
   * OnMount Phase
   * Api call for getting Shows to display in Home Screen
   * using  https://api.tvmaze.com/search/shows?q=all as given in description
   * hand saving result in data State
   * @return void
   */

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  
  // tried to be as minimalistic as possible to mimic actual show screen
  
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.map((e) => (
        <Card style={{ width: "20rem", height: "23rem", margin: 20 }}>
          <Card.Img
            variant="top"
            style={{
              width: "20rem",
              height: "12rem",
              padding: 7,
              borderRadius: 15,
            }}
            src={e.show?.image?.medium}
            alt={e.show.name}
          />
          <Card.Body style={{ height: "50%" }}>
            <Card.Title>{e?.show?.name}</Card.Title>
            <Card.Text>{e?.show?.language} . {e?.show?.genres.join(" / ")} . {e?.show?.premiered }</Card.Text>
            <Card.Text>Rating : {e?.show?.rating?.average || 0} / 10</Card.Text>
            <Link to={"/summary"} state={e} >
              <Button variant="primary">Show More</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;
