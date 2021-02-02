//utility scripts to be used as helpers in multiple places

class Util
{
    static clamp(n: number, min: number, max: number) : number
    {
        if (n < min){return min;}
        if (n > max){return max;}
        return n;
    }
}

export default Util;