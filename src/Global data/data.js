export const categories =['Other', 'Food' , 'Transport' , 'Entertainment' , 'Shopping' , 'Bills']

export const OnlyStringChars=/^[a-zA-Z\s]+$/;
export const OnlyNumbers=/^\d+(\.\d+)?$/;
export const handleDateTime =(date) =>{
    const Months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]
        let currentMmontName = Months[(date.getMonth())];
    return `${date.getDate()} ${currentMmontName} ${date.getFullYear()}`
}