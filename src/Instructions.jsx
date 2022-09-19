//this component displays instructions
// monster pictures generated from https://www.calculators.org/games/monster-constructor/

import { useRef, useState } from 'react';
import { causalShape, animalNames, zorbaIsMonsterOne } from './randomizedParameters';
import './Instructions.css'
import { textStyle, buttonStyle } from './dimensions';
import monster_one_small from './monster_one_small.png';
import monster_two_small from './monster_two_small.png';
import alien_enzyme from './alien_enzyme.jpg'
import Data from './Data';





const Instructions = (props) => {
    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    //the dimensions for some of the text
    const localTextStyle = {
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        //minHeight: "100vh",
        marginLeft: "10vw",
        marginRight: "10vw",
        fontSize: "20px",
    }

    //the props we will pass on to each page
    const tutorialProps = {
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
        localTextStyle: localTextStyle
    };



    //the list of pages
    const instructionTrials = [<Intro {...tutorialProps} />,
    <IntroTwo {...tutorialProps} />,
    <IntroThree {...tutorialProps} />
    ];


    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

//the first page
const Intro = (props) => {
    return (
        <span style={textStyle}
        >
            <p style={{ color: "red" }}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
            <br></br>
            <p>In this study, we will ask you to imagine that you are a scientist visiting an alien planet.</p>
            <p>You are studying the dietary habits of the animals living on that planet.

            </p>
            <p>You are interested in how much food an animal of a given species tends to eat.</p>


            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
            <br></br>
        </span>
    )
}

//the second page
const IntroTwo = (props) => {

    const explanationExtremizer = <p>
        In particular, the enzyme can decrease or increase an animal's appetite.<br></br><br></br>
        On days that an animal <span style={{ color: "green" }}>has XRD</span> in its blood, it eats either a very low or a very high amount of food.<br></br>

        On days that an animal <span style={{ color: "red" }}>does not have XRD</span> in its blood, it eats a moderate amount of food.
    </p>

    const explanationModerator = <p>
        In particular, the enzyme can make the animal's appetite more normal.<br></br><br></br>
        On days that an animal <span style={{ color: "green" }}>has XRD</span> in its blood, it eats a moderate amount of food. <br></br>
        On days that an animal <span style={{ color: "red" }}>does not have XRD</span> in its blood, it eats either a very low or a very high amount of food.
        <br></br>
    </p>

    const effectExplanation = causalShape === "extremizer" ? explanationExtremizer :
        (causalShape === "moderator" ? explanationModerator : null);
    return (
        <span style={textStyle}
        >
            <p>Your colleagues have discovered an enzyme called XRD
                that can be found in the blood of animals of many species.
                They have also discovered that the presence of XRD in an animal's blood can affect how much food it eats.

            </p>

            <img src={alien_enzyme} style={{ width: "10vw" }} />


            {effectExplanation}
            {/* <p>Some of your colleagues have discovered an enzyme called XRD that can be found in the blood of animals of many species.
                The presence of XRD in an animal tends to fluctuate: an individual can have XRD in its blood on some days but not others.
            </p>
            <img src={alien_enzyme} style={{ width: "10vw" }} />

            <p>In about 50% of species that have been studied, the presence of the XRD enzyme in the animal's blood has
                absolutely <span style={{ color: 'red' }}><b>no influence</b></span> on how much the animal eats.
            </p>

            <p>In the other 50% of species that have been studied, the XRD enzyme <span style={{ color: "green" }}><b>influences the animal's appetite</b></span>.
                In these species, when an animal has XRD in its blood it will eat
                either a very small <i>or</i> a very large amount of food on that day.
                When the animal doesn't have XRD in its blood, it will eat a moderate amount of food.
            </p> */}


            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
            <br></br>
        </span>
    )
}


//the third page
const IntroThree = (props) => {

    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton =
        <button style={buttonStyle} onClick={() => props.setCurrentPhase("test")}>click to continue</button>;

    const animalName = animalNames[0];
    const pic = animalName === "zorba" ? [monster_two_small, monster_one_small][zorbaIsMonsterOne] :
        (animalName === "yorgi" ? [monster_one_small, monster_two_small][zorbaIsMonsterOne] : null);
    //display the page
    return (

        <div className="page"
            style={textStyle}
        >
            <div //className="text" 
                style={props.localTextStyle}
            >
                <p>You decide to study the food consumption of an animal called the {animalName}.</p>
                <img style={{ width: "8vw" }} src={pic} />
                <p>You study the same {animalName} over 40 days.</p>


                {nextPageButton}
            </div>

        </div >

    )

}

//the fourth page
const IntroFour = (props) => {

    const animalName = animalNames[0];

    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton =
        <button style={buttonStyle} onClick={() => props.setCurrentPhase("test")}>click to start the task</button>;

    //display the page
    return (

        <div className="page"
            style={textStyle}
        >
            <div //className="text" 
                style={props.localTextStyle}
            >
                <p>Every day you collect two measurements about the {animalName}:
                    whether it has enzyme XRD in its bloodstream, and how much food it has eaten.</p>

                <p>You will see data collected on the {animalName} for each of 40 days.
                    Then we will ask you some simple questions about the animal.</p>
                <p>Please pay close attention to the data you observe!</p>
                {nextPageButton}
            </div>

        </div>




    )

}





export default Instructions;