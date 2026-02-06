export function getAge(birthDate) {
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    const dayDifference = birthDate.getDay() - today.getDay();

    if (dayDifference < 0) {
        years--;
    }
  
    return years;
}