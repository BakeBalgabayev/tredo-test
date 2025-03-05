import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressInfoSchema } from '../lib/validation';

interface AddressInfoFormProps {
    onNext: (data: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
}

export const AddressInfoForm: React.FC<AddressInfoFormProps> = ({ onNext, defaultValues }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addressInfoSchema) as any,
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onNext)} className="space-y-4">
            <input {...register('country')} placeholder="Страна" className="input" />
            <input {...register('city')} placeholder="Город" className="input" />
            <input {...register('address')} placeholder="Адрес" className="input" />
            <input {...register('postalCode')} placeholder="Почтовый индекс" className="input" />
            <button type="submit" className="btn-primary">Далее</button>
            {Object.values(errors).map((err, index) => (
                <p className="text-red-500" key={index}>{String(err?.message)}</p>
            ))}
        </form>
    );
};