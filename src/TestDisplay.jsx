// this component controls the display of the food data on a given day.

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { colors, zorbaIsMonsterOne } from './randomizedParameters';
import { shuffle } from './convenienceFunctions';
import monster_one_enzyme from './monster_one_with_enzyme.png';
import monster_one_noEnzyme from './monster_one_without_enzyme.png';
import monster_two_enzyme from './monster_two_with_enzyme.png';
import monster_two_noEnzyme from './monster_two_without_enzyme.png';



const TestDisplay = (props) => {


  // the next page button. It appears after 750 milliseconds [CHANGE THIS BACK]
  const Button = (props) => {
    const [isShown, setIsShown] = useState(false);
    const handleClick = () => {
      setIsShown(false);
      setberriesShown(false);
      props.incrementTest(props.testNumber);
    };
    useEffect(() => {
      const timer = setTimeout(() => {
        setberriesShown(true);
      }, 500);
      return () => clearTimeout(timer);
    }, [handleClick]);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsShown(true);
      }, 500);
      return () => clearTimeout(timer);
    }, [handleClick]);



    return (isShown ? <button style={buttonStyle}
      onClick={() => handleClick()}>Next</button> : "")
  };



  const [berriesShown, setberriesShown] = useState(false);

  // dimensions of the box containing berries
  const svgWidth = 300;
  const svgHeight = 300;
  // diameter of a berry
  const r = 20;
  // number of berries and presence of the enzyme
  const number = props.list[props.testNumber - 1][1];
  const enzyme = props.list[props.testNumber - 1][0];

  // decide which monster picture to display
  const picMonsterEnzyme = zorbaIsMonsterOne ? (
    props.animalName == "zorba" ? monster_one_enzyme : monster_two_enzyme) :
    (props.animalName == "zorba" ? monster_two_enzyme : monster_one_enzyme);

  const picMonsterNoEnzyme = zorbaIsMonsterOne ? (
    props.animalName == "zorba" ? monster_one_noEnzyme : monster_two_noEnzyme) :
    (props.animalName == "zorba" ? monster_two_noEnzyme : monster_one_noEnzyme);


  const picEnzyme = enzyme ? <img style={{ float: 'left', width: "10vw" }}
    src={picMonsterEnzyme} /> :
    <img style={{ float: 'left', width: "10vw" }} src={picMonsterNoEnzyme} />;

  // generate the berries to be displayed onscreen
  const Circles = (props) => {

    var circleBoolean = useRef(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
      return (i < number ? 1 : 0);
    })));
    let circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
      let color = circleBoolean.current[i] ? colors[props.animalNumber] : "white";
      return (
        <circle
          //cx={(160 * i + (r + 10) + (.5 - Math.random()) * 20) % svgWidth}
          //cy={30 * i + (r + 10) + (.5 - Math.random()) * 20} r={r} fill={color}
          cx={(120 * i + (r + 10) + (.5 - Math.random()) * 20) % svgWidth}
          cy={20 * i + (r + 10) + (.5 - Math.random()) * 20} r={r} fill={color}
        />
      )
    });
    return (circles)
  }

  const berriesPicture = berriesShown ? <Circles animalNumber={props.animalNumber} /> : "";
  const berriesText = berriesShown ? <p> <span style={{ color: "black" }}><b>{number} </b>berries.</span> </p> :
    <p> <span style={{ color: "white" }}><b>{number} </b>berries.</span> </p>

  return (<div style={textStyle}>
    <p>On day number {props.testNumber}, the {props.animalName} had
      <b>{enzyme ? "" : " no trace of"} XRD enzyme</b> in its blood, and ate</p>
    {berriesText}
    <span>
      {picEnzyme}
      <svg style={{ float: 'left', marginLeft: '5vw' }} width={svgWidth} height={svgHeight} id={"id"} >
        {berriesPicture}

      </svg>
    </span>
    <Button incrementTest={props.incrementTest}
      testNumber={props.testNumber} />
  </div>)
};

export default TestDisplay;



