function countDateLess(date,countLess){
    const dateLess = date.getFullYear() + "-" + (date.getMonth() - countLess) + "-" + 1;
    return dateLess;
}

function ultimoDiaMes(date){
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    return lastDayOfMonth;
}

export default {countDateLess,ultimoDiaMes}