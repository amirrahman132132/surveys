import 'survey-react/modern.min.css';
import { Survey as SurveyJS, StylesManager, Model } from 'survey-react';
import React from 'react'
import packageJson from '../package.json';

StylesManager.applyTheme("modern");

export default function SurveyFactory(surveyName, surveyJson, scoreFunc) {
    console.log(scoreFunc)
    function Survey ({ onComplete }) {
        const scoreResponses = (sender) => {
            const { data: responses } = sender;
            const result = scoreFunc(responses)
            const record = { 
                surveySource: packageJson["name"],
                surveyVersion: packageJson["version"],
                surveyName, 
                responses, 
                result,
                submitTime: Date.now()
            }
            onComplete(record)
        }
    
        const surveyModel = new Model(surveyJson);
        surveyModel.onComplete.add(scoreResponses);
    
        return <SurveyJS model={surveyModel}/>
    }

    return Survey
}