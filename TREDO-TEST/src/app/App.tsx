import React from 'react';
import { MultiStepForm } from '../features/MultiStepForm/ui/MultiStepForm';

const App: React.FC = () => {
    return (
        <div className="app-container min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
                <h1 className="text-2xl font-bold mb-4">Кредитная заявка</h1>
                <MultiStepForm />
            </div>
        </div>
    );
};

export default App;