import Resources from "../scripts/Resources";

class GameplayStartConfig
{
    static readonly startingResources: Resources = new Resources(20, 0, 0, 0, 0, 0);
    static readonly startingStorage: Resources = new Resources(50, 50, 50, 50, 0, 10);
    static readonly startingPop: number = 50;
    static readonly startingHapp: number = 70;
}

export default GameplayStartConfig;