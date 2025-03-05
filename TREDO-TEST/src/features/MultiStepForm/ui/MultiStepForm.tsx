import React, { useState, useEffect } from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { AddressInfoForm } from './AddressInfoForm';
import { FinancialInfoForm } from './FinancialInfoForm';
import { StepIndicator } from './StepIndicator';
import { formStorage } from '../lib/storage';

interface FormData {
    personal?: Record<string, any>;
    address?: Record<string, any>;
    financial?: Record<string, any>;
}

const STEPS = ['personal', 'address', 'financial'] as const;

export const MultiStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>(formStorage.load() || {});

    useEffect(() => {
        const savedStep = Object.keys(formData).length;
        setCurrentStep(savedStep);
    }, []);

    const handleNext = (stepData: Record<string, any>) => {
        const stepName = STEPS[currentStep];
        const updatedData = { ...formData, [stepName]: stepData };

        setFormData(updatedData);
        formStorage.save(stepName, stepData);

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit(updatedData);
        }
    };

    const handleSubmit = async (data: FormData) => {
        try {
            const response = await fetch('https://mockapi.io/credit-applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) alert('Заявка отправлена успешно!');
        } catch (error) {
            alert('Ошибка отправки');
        }
    };

    return (
        <div>
            <StepIndicator currentStep={currentStep} steps={STEPS} />
            {currentStep === 0 && <PersonalInfoForm onNext={handleNext} defaultValues={formData.personal} />}
            {currentStep === 1 && <AddressInfoForm onNext={handleNext} defaultValues={formData.address} />}
            {currentStep === 2 && <FinancialInfoForm onNext={handleNext} defaultValues={formData.financial} />}
        </div>
    );
};