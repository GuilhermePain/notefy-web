export const formatData = (data: string) => { 
    const newDate = new Date(data);
    return newDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}