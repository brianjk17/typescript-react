import React, {createContext, useContext, useEffect, useRef, useState} from "react";
//https://github.com/QuickNuggets/multi-step-form/blob/master/src/App.js
interface StepperParameters {
    handleClick?: any;
    currentStep: any;
    steps: any;
}

export const StepperContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children }: any) {
    let userData: string;
    let setUserData: any;
    [userData, setUserData] = useState("");

    return (
        <StepperContext.Provider value={{ userData, setUserData }}>
            {children}
        </StepperContext.Provider>
    );
}

// function useStepperContext() {
//     const { userData, setUserData } = useContext(StepperContext);
//     return { userData, setUserData };
// }

export function StepperControl({ handleClick, currentStep, steps }: StepperParameters) {
    return (
        <div className="container mt-4 mb-8 flex justify-around">
            <button
                onClick={() => handleClick()}

                className={`inline-block px-6 py-2.5 font-medium text-xs leading-tight rounded focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out border-2 border-slate-300 bg-white text-slate-400 hover:bg-slate-700 hover:text-white  ${
                    currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
                }`}
            >
                Back
            </button>

            <button
                onClick={() => handleClick("next")}
                className="inline-block px-6 py-2.5 font-medium text-xs leading-tight rounded focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out text-white hover:bg-slate-700 hover:text-white bg-blue-600"
            >
                {currentStep === steps.length ? "Submit" : "Next"}
            </button>
        </div>
    );
}

interface Step {
    description: string;
    highlighted: boolean;
    selected: boolean;
    completed: boolean;
}

export const Stepper = ({ steps, currentStep }: StepperParameters) => {
    const [newStep, setNewStep] = useState([]);
    const stepsRef: React.MutableRefObject<Step[] | undefined> = useRef();

    const updateStep = (stepNumber: number, steps: Step[]) => {
        const newSteps = [...steps];
        console.log(newSteps);
        let count = 0;
        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;
            }

            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            }
            //step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }

        return newSteps;
    };

    useEffect(() => {
        const stepsState = steps.map((step: any, index: number) =>
            Object.assign(
                {},
                {
                    description: step,
                    completed: false,
                    highlighted: index === 0,
                    selected: index === 0,
                }
            )
        );

        stepsRef.current = stepsState;
        let current: any;
        if(stepsRef.current!==undefined){
            current = updateStep(currentStep - 1, stepsRef.current);
        }
        setNewStep(current);
    }, [steps, currentStep]);

    const stepsDisplay = newStep.map((step: Step, index) => {
        return (
            <div
                key={index}
                className={
                    index !== newStep.length - 1
                        ? "w-full flex items-center"
                        : "flex items-center"
                }
            >
                <div className="relative flex flex-col items-center text-blue-600">
                    <div
                        className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3  ${
                            step.selected
                                ? "bg-blue-600 text-white font-bold border border-blue-600 "
                                : ""
                        }`}
                    >
                        {step.completed ? (
                            <span className="text-white font-bold text-xl">&#10003;</span>
                        ) : (
                            index + 1
                        )}
                    </div>
                    <div
                        className={`absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase ${
                            step.highlighted ? "text-gray-900" : "text-gray-400"
                        }`}
                    >
                        {step.description}
                    </div>
                </div>
                <div
                    className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
                        step.completed ? "border-blue-600" : "border-gray-300 "
                    }  `}
                ></div>
            </div>
        );
    });

    return (
        <div className="mx-4 p-4 flex justify-between items-center">
            {stepsDisplay}
        </div>
    );
}