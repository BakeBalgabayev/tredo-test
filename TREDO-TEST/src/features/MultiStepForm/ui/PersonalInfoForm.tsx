import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '../lib/validation.ts';

interface PersonalInfoFormProps {
    onNext: (data: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onNext, defaultValues }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(personalInfoSchema) as any,
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onNext)}>
            <input {...register('firstName')} placeholder="Имя" />
            <input {...register('lastName')} placeholder="Фамилия" />
            <input type="date" {...register('dob')} />
            <input {...register('phone')} placeholder="+77XXXXXXXXX" />
            <input {...register('email')} placeholder="Email" />
            <button type="submit" className="btn-primary">Далее</button>
            {Object.values(errors).map((err, index) => (
                <p key={index} className="text-danger">{String(err?.message)}</p>
            ))}
        </form>
    );
};