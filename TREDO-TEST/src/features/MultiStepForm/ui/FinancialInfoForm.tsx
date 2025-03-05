import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { financialInfoSchema } from '../lib/validation';

interface FinancialInfoFormProps {
    onNext: (data: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
}

export const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({ onNext, defaultValues }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(financialInfoSchema) as any,
        defaultValues,
    });

    const onSubmit = (data: Record<string, any>) => {
        const parsedData = {
            ...data,
            income: parseFloat(data.income),
            loanAmount: parseFloat(data.loanAmount),
            loanTerm: parseInt(data.loanTerm, 10),
        };
        onNext(parsedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="number" {...register('income', { valueAsNumber: true })} placeholder="Ежемесячный доход" className="input" />
            <input type="number" {...register('loanAmount', { valueAsNumber: true })} placeholder="Сумма кредита" className="input" />
            <input type="number" {...register('loanTerm', { valueAsNumber: true })} placeholder="Срок кредита (в месяцах)" className="input" />
            <button type="submit" className="btn-primary">Отправить</button>
            {Object.values(errors).map((err, index) => (
                <p className="text-red-500" key={index}>{String(err?.message)}</p>
            ))}
        </form>
    );
};