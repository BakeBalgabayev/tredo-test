import { z } from 'zod';

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    dob: z.string().min(1, 'Дата рождения обязательна'),
    phone: z.string().regex(/^\+77\d{9}$/, 'Неверный формат телефона'),
    email: z.string().email('Неверный email')
});

export const financialInfoSchema = z.object({
    income: z.number().min(1, 'Доход должен быть больше 0'),
    loanAmount: z.number().min(20000).max(1000000, 'Сумма от 20000 до 1000000'),
    loanTerm: z.number().min(1, 'Срок обязателен')
});

export const addressInfoSchema = z.object({
    country: z.string().min(1, 'Страна обязательна'),
    city: z.string().min(1, 'Город обязателен'),
    address: z.string().min(1, 'Адрес обязателен'),
    postalCode: z.string().regex(/^\d{5,10}$/, 'Почтовый индекс должен содержать от 5 до 10 цифр')
});