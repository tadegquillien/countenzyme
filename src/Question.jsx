
// This component displays the questions asked about each animal
// after the observation phase


import { useState, useRef } from 'react';
import { animalNames } from "./randomizedParameters";
import { textStyle, buttonStyle } from './dimensions';
import { sum, shuffle } from './convenienceFunctions';
import { colors, zorbaIsMonsterOne } from './randomizedParameters';
import './Question.css';
import Data from "./Data";
import monster_one_enzyme from './monster_one_with_enzyme.png';
import monster_one_noEnzyme from './monster_one_without_enzyme.png';
import monster_two_enzyme from './monster_two_with_enzyme.png';
import monster_two_noEnzyme from './monster_two_without_enzyme.png';


const Circles = (props) => {
    const r = 20;
    const randomXjitter = useRef(Math.random());
    const randomYjitter = useRef(Math.random());
    const OneToTen = useRef(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    var circleBoolean = OneToTen.current.map((i) => {
        return (i < props.actualNumber ? 1 : 0);
    });
    let circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        let color = circleBoolean[i] ? colors[props.animalNumber] : "white";
        return (
            <circle
                cx={(120 * i + (r + 10) + (.5 - randomXjitter.current) * 20) % props.svgWidth}
                cy={20 * i + (r + 10) + (.5 - randomYjitter.current) * 20} r={r} fill={color}
            />
        )
    });
    return (circles)
}

const Question = (props) => {
    // the actual food amount eaten by the creature on the current day
    //const actualNumber = actuals[props.animalNumber];
    // this array will store the slider values
    const [response, setResponse] = useState([...Array(10)].fill(50));
    const [clicked, setClicked] = useState([...Array(10)].fill(0));


    const buttontext = (props.mode === "counterfactual" | props.mode === "conditionalDistribution") ? "next" :
        (props.animalNumber < (animalNames.length - 1) ? "click to go to the next animal" :
            "click to go to the next phase");
    const nextButton = sum(clicked) > (response.length - 1) ? <button style={buttonStyle} onClick={() => handleClick()}>{buttontext}</button> : "(please move all the sliders before going to the next page)";


    // generate the berries to be displayed onscreen
    const svgWidth = 300;
    const svgHeight = 300;


    // submit the answers and go to the next screen
    const handleClick = () => {
        Data.responses.push({
            "animalName": props.animalName,
            "ratings": response,
            "actualAmount": props.actualNumber,
            //"distribution": listorder[props.animalNumber],
            "trainingSequence": props.list,
            "question": props.mode,
            "testNumber": props.testNumber
        })
        console.log(Data);
        if (props.mode === "counterfactual") {
            setResponse([...Array(10)].fill(50));
            setClicked([...Array(10)].fill(0));
            window.scrollTo(0, 0);
            props.setTestNumber((i) => i + 1)
        }
        if (props.mode === "conditionalDistribution") {
            setResponse([...Array(10)].fill(50));
            setClicked([...Array(10)].fill(0));
            window.scrollTo(0, 0);
            props.setTestNumber((i) => i + 1)
        }
        if (props.mode === "conditionalDistributionOff") {
            props.setAnimalNumber((i) => i + 1);
            props.setTestNumber(0);
        }

    };

    // make the sliders
    const sliders = <div class="rotate">{[...Array(10).keys()].map((i) => {
        return (<div>
            {i + 1}<span> berries</span>{i === 9 ? <span>&nbsp;</span> : <span> &nbsp; </span>}
            <input onChange={(e) => handleSlider(e, i)}
                type="range" min="1" max="100" //style={{width:"30vw"}} 
                value={response[i]} className="slider" id={i} />
        </div>

        )
    })}</div>

    const updateClicked = (id) => {
        const newCs = [...Array(clicked.length).keys()].map((i) => {
            return (
                id === i ? 1 : clicked[i]
            )
        });
        setClicked(newCs)
    }
    // when the user moves the slider, adjust the slider value
    const handleSlider = (e, id) => {
        const proposal = [...Array(response.length).keys()].map((i) => {
            return (
                i === id ? e.target.valueAsNumber : response[i]
            )
        })
        updateClicked(id);
        setResponse(proposal);

    };

    // normalize so that slider values sum to 100 [not implemented]
    const normalize = (id) => {
        // this function creates a vector that will help us compute
        // the sum of the values of all other sliders
        // const filter = (vector, index)=>{
        //     return([...Array(vector.length).keys()].map((i)=>{
        //         return(i === index ? 0 : vector[i])
        //     }))
        // };
        // // adjust slider values. 
        // const newRs = [...Array(response.length).keys()].map((i)=>{
        //     return(
        //         id===i ? response[i] : (response[i])/(sum(filter(response,id))+1)*(100-response[id])
        //     )
        // });
        // console.log(sum(newRs));
        // console.log(newRs);
        // setResponse(newRs);
    }

    const sliderDiv = <div class="slidecontainer">
        {sliders}
    </div>

    const lessOrMore = (props.actualNumber < 6) ? "more" : "less";
    const textCounterfactual = <div>
        <svg style={{ marginLeft: '5vw' }} width={svgWidth} height={svgHeight} id={"id"} >
            <Circles animalNumber={props.animalNumber} actualNumber={props.actualNumber}
                svgWidth={svgWidth} />

        </svg>
        <p>On another day you see the {props.animalName} eat <b>{props.actualNumber}</b> berries.
            You have not tested whether it has enzyme XRD in its blood or not.</p>

        <p>If the {props.animalName} had eaten <b>{lessOrMore} than {props.actualNumber} berries</b> on that day,
            how many berries do you think it would have eaten?</p>
        <p>Please use the slider next to each number to indicate how much you agree
            that the {props.animalName} would have eaten that number of berries.
        </p>
        {sliderDiv}

    </div>

    // decide which monster picture to display
    const picMonsterEnzyme = zorbaIsMonsterOne ? (
        props.animalName === "zorba" ? monster_one_enzyme : monster_two_enzyme) :
        (props.animalName === "zorba" ? monster_two_enzyme : monster_one_enzyme);

    const picMonsterNoEnzyme = zorbaIsMonsterOne ? (
        props.animalName === "zorba" ? monster_one_noEnzyme : monster_two_noEnzyme) :
        (props.animalName === "zorba" ? monster_two_noEnzyme : monster_one_noEnzyme);


    const picEnzyme = props.mode === "conditionalDistribution" ? <img style={{ width: "10vw" }}
        src={picMonsterEnzyme} /> :
        (props.mode === "conditionalDistributionOff" ? <img style={{ width: "10vw" }} src={picMonsterNoEnzyme} /> : null);

    const textConditional = <div>
        <div>{picEnzyme}</div>
        <p>In general, when the {props.animalName} <b>has the XRD enzyme in its blood</b>, how many berries does it eat? </p>

        <p>Please use the slider next to each number to indicate to what extent
            the {props.animalName} is likely to eat that amount of berries when it has <b>the XRD enzyme</b> in its blood.
        </p>
        {sliderDiv}
    </div>

    const textConditionalOff = <div>
        <div>{picEnzyme}</div>
        <p>In general, when the {props.animalName} <b>does NOT have the XRD enzyme</b> in its blood, how many berries does it eat? </p>

        <p>Please use the slider next to each number to indicate to what extent
            the {props.animalName} is likely to eat that amount of berries when it has <b>no XRD enzyme</b> in its blood.
        </p>
        {sliderDiv}
    </div>

    const text = props.mode === "counterfactual" ? textCounterfactual :
        (props.mode === "conditionalDistribution" ? textConditional :
            props.mode === "conditionalDistributionOff" ? textConditionalOff : null);


    return (<div style={textStyle}>
        {text}<br></br><br></br>
        {nextButton}
        <span>&nbsp;</span>
    </div>)
}

export default Question;