import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
    steps: readonly string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
    return (
        <div className="step-indicator">
            {steps.map((step, index) => (
                <span key={step} className={index <= currentStep ? 'active' : ''}>{}</span>
            ))}
        </div>
    );
};