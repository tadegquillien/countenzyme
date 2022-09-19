import { textStyle, buttonStyle } from './dimensions';
import { animalNames } from "./randomizedParameters";

const Transition = (props) => {

    const handleClick = () => {
        props.incrementTest(props.testNumber);
    }

    const animalName = animalNames[0];
    const text = <div style={textStyle}>
        <p>Every day you collect two measurements about the {animalName}:
            whether it has enzyme XRD in its bloodstream, and how much food it has eaten.</p>

        <p>You will see data collected on the {animalName} for each of 40 days.
            Then we will ask you some simple questions about the animal.</p>
        <p>Please pay close attention to the data you observe!</p>
        <button style={buttonStyle} onClick={() => handleClick()}>Next</button>
    </div>;

    // const text = <div style={textStyle}>
    //     <p>You will now see data about a new animal: a {props.animalName}.</p>
    //     <p>On each page, you will see information about how much food the {props.animalName} ate on a given day.
    //         In total you will see data for each of 40 consecutive days.
    //     </p>
    //     <button style={buttonStyle} onClick={() => handleClick()}>Next</button>
    // </div>;
    return (text);


};

export default Transition;