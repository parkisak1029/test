function solution(absolutes, signs) {
    var trues = 0;
    var falses = 0;
    for(i = 0; i < absolutes.length; i++)
    {
        if(signs[i] == true) trues += absolutes[i];
        else falses += absolutes[i];
    }

    return console.log(trues - falses);
}

solution([4,10,3], [true, false, true]);