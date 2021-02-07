import Util from './Util';

class Resources
{
    food: number;
    wood: number;
    stone: number;
    metal: number;
    currency: number;
    knowledge: number;

    constructor(f: number, w: number, s:number, m:number, c:number, k:number)
    {
        this.food = f;
        this.wood = w;
        this.stone = s;
        this.metal = m;
        this.currency = c;
        this.knowledge = k;
    }

    //shorthand
    static get zero(): Resources {return new Resources(0, 0, 0, 0, 0, 0);}

    add(other: Resources) : Resources
    {
        return new Resources(this.food + other.food, this.wood + other.wood, this.stone + other.stone, this.metal + other.metal, this.currency + other.currency, this.knowledge + other.knowledge);
    }

    subtract(other: Resources) : Resources
    {
        return new Resources(this.food - other.food, this.wood - other.wood, this.stone - other.stone, this.metal - other.metal, this.currency - other.currency, this.knowledge - other.knowledge);
    }

    mult(other: Resources | number) : Resources
    {
        if(typeof other === "number")
        {
            return new Resources(this.food * other, this.wood * other, this.stone * other, this.metal * other, this.currency * other, this.knowledge * other);
        }
        return new Resources(this.food * other.food, this.wood * other.wood, this.stone * other.stone, this.metal * other.metal, this.currency * other.currency, this.knowledge * other.knowledge);
    }

    biggerThan(other: Resources) : boolean
    {
        return (this.food > other.food && this.wood > other.wood && this.stone > other.stone && this.metal > other.metal && this.currency > other.currency && this.knowledge > other.knowledge);
    }

    biggerEqThan(other: Resources) : boolean
    {
        return (this.food >= other.food && this.wood >= other.wood && this.stone >= other.stone && this.metal >= other.metal && this.currency >= other.currency && this.knowledge >= other.knowledge);
    }

    equal(other: Resources) : boolean
    {
        return (this.food === other.food && this.wood === other.wood && this.stone === other.stone && this.metal === other.metal && this.currency === other.currency && this.knowledge === other.knowledge);
    }

    clamp(min: Resources, max: Resources) : Resources
    {
        const f: number = Util.clamp(this.food, min.food, max.food);
        const w: number = Util.clamp(this.wood, min.wood, max.wood);
        const s: number = Util.clamp(this.stone, min.stone, max.stone);
        const m: number = Util.clamp(this.metal, min.metal, max.metal);
        const c: number = Util.clamp(this.currency, min.currency, max.currency);
        const k: number = Util.clamp(this.knowledge, min.knowledge, max.knowledge);
        return new Resources(f, w, s, m, c, k);
    }

    static Sum(...params: [Resources]) : Resources | null
    {
        if (params.length <= 0){return null;}
        if (params.length === 1){return params[0];}
        let result: Resources = params[0];
        for (let i: number = 1; i < params.length; i++)
        {
            result = result.add(params[i]);
        }
        return result;
    }

    static createFromJSON(json: {food: number, wood:number, stone:number, metal:number, currency:number, knowledge:number})
    {
        return new Resources(json.food, json.wood, json.stone, json.metal, json.currency, json.knowledge);
    }
}

export default Resources;