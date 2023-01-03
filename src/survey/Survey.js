import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


const Survey = () => {
    const[step, setStep] = useState(1) //페이지 전환을 위한 useState
    const[inputs, setInputs] = useState(
        {
            name :'',
            height : '',
            age : '',
            weight : '',
            gender : '',
            interest: [],
            score:'',
            result: ''
        }
    ) //사용자로부터 입력받을 값들 초기화(default값 설정)
    
    const {name, height, age, weight,interest, gender, score, result} = inputs
    
    //JSX내에서 간단하게 사용하기 위해 비구조할당

    

    const nextSteps =()=>{
        setStep(step+1)			//다음 페이지로
    } 
    const prevSteps =()=>{
        setStep(step-1)			//이전 페이지로
    } 
   
    const onSubmit = (e) => {
        const { value, name } = e.target;
        setInputs({
        
          ...inputs,
          [name]: value,
        });
       	
    
    }
    return (
        <div className="wrap">
            {
                step === 1 &&
                <Step1 
                name={name} 
                height={height}
                age={age}
                weight={weight}
                gender={gender}
                onSubmit={onSubmit}
                nextSteps={nextSteps}/>
            }{
                step ===2 &&
                <Step2
                prevSteps={prevSteps}
                nextSteps={nextSteps}/>
            }
            {
                step ===3 &&
                <Step3
                prevSteps={prevSteps}
                nextSteps={nextSteps}
                />
            }
            
            {
                 step ===4 &&
                 <Step4
                 prevSteps={prevSteps}
                 nextSteps={nextSteps}
                 />
            }
        </div>
    );
};

export default Survey;