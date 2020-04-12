const checkZero = data =>{
    if(data.length == 1){
        data = "0" + data;
    }
    return data;
}

module.exports = (date) => {
    const d = date;
    let day = String(d.getDate());
    let month = String(d.getMonth()+1); // january starts in 0, we must add 1
    let year = String(d.getFullYear());
    let hour = String(d.getHours());
    let minutes = String(d.getMinutes());
    let seconds = String(d.getSeconds());

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    resultDate = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    return resultDate;

}
