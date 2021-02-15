//utility scripts to be used as helpers in multiple places

class Util
{
    static clamp(n: number, min: number, max: number) : number
    {
        if (n < min){return min;}
        if (n > max){return max;}
        return n;
    }

    /**Returns random integer between min (inclusive) and max (inclusive). */
    static rInt(min: number, max: number): number
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**Returns random float between min (inclusive) and max (exclusive). */
    static rFloat(min: number, max: number): number
    {
        return Math.random() * (max - min) + min;
    }

    static rChance(chance: number): boolean
    {
        return (this.rFloat(0, 100) < chance);
    }
}

export default Util;