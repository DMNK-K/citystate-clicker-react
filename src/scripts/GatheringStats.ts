import Resources from "./Resources";

class GatheringStats
{
    readonly name: string = "";
    readonly base: Resources = Resources.zero;
    readonly lucky: Resources = Resources.zero;
    readonly luckChance: number = 0;
    readonly replenishTime: number = 1000;
    readonly availableMax: number = 10;

    constructor(name:string, base: Resources, lucky: Resources, luckChance: number, replenishTime: number, availableMax: number)
    {
        this.name = name;
        this.base = base;
        this.lucky = lucky;
        this.luckChance = luckChance;
        this.replenishTime = replenishTime;
        this.availableMax = availableMax;
    }
}

export default GatheringStats;