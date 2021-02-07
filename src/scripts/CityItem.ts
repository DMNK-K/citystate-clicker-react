import CityItemSaveInterface from "./CityItemSaveInterface";
import Resources from "./Resources";
interface BuildingJSONInterface
{
    uiName: string,
    lvlMax: number,
    desc: string,
    position: string | number[],
    prereq?: {reqName: string, reqLvl: number}[]
}

interface TechJSONInterface
{
    uiName: string,
    desc: string,
    prereq?: {reqName: string, reqLvl: number}[]
}

/**Class for representing CityItems, used in CityItemBox components, can represent both Tech and Buildings
 * Maybe will be split into 2 inheriting from 1 parent class
 */
class CityItem
{
    name: string = "";
    uiName: string = "";
    desc: string = "";
    iconPath: string = "";

    position: number[] | null | string = null;

    isTech: boolean = false;
    isInProgress: boolean = false;
    progress: number = 0;

    lvl: number = 0;
    lvlMax: number = 1;

    prerequisites: {reqName: string, reqLvl: number}[] = [];
    
    labours: number[] = [10];
    costs: Resources[] = [];
    profits: Resources[] = [];
    addedStorage: Resources[] = [];

    //cost in resources of going from current lvl to 1 up
    get cost(): Resources
    {
        return (this.costs.length < this.lvl && this.lvl >= 0) ? this.costs[this.lvl] : Resources.zero;
    }

    //profit in resources at current lvl
    get profit(): Resources
    {
        return (this.profits.length < this.lvl - 1 && this.lvl - 1 >= 0) ? this.profits[this.lvl - 1] : Resources.zero;
    }

    get labour(): number
    {
        return (this.labours.length < this.lvl && this.lvl >= 0) ? this.labours[this.lvl] : 0;
    }

    get allAddedStorage(): Resources
    {
        const result = Resources.zero;
        for (let i: number = 0; i < Math.min(this.addedStorage.length, this.lvl); i++)
        {
            result.add(this.addedStorage[i]);
        }
        return result;
    }

    get canLvlUp(): boolean {return this.lvl < this.lvlMax && !this.isInProgress;}

    constructor(name: string)
    {
        this.name = name;
    }

    /**Puts the save data that was loaded into fruition within this instance. */
    impartSaveData(loadedSaveData: CityItemSaveInterface): void
    {
        this.lvl = loadedSaveData.lvl;
        this.isInProgress = loadedSaveData.isInProgress;
        this.progress = loadedSaveData.progress;
    }

    /**Creates a new instance from basic parsed JSON data */
    static createBuildingFromJSON(name: string, json: BuildingJSONInterface): CityItem
    {
        const result = new CityItem(name);
        result.uiName = json.uiName;
        result.lvlMax = json.lvlMax;
        result.isTech = false;
        result.desc = json.desc;
        result.position = json.position;
        result.prerequisites = (typeof(json.prereq) === "undefined") ? [] : json.prereq;
        result.iconPath = process.env.PUBLIC_URL + "/images/bld_icons/icon_" + name + ".png";
        return result;
    }

    /**Creates a new instance from basic parsed JSON data */
    static createTechFromJSON(name: string, json: TechJSONInterface): CityItem
    {
        const result = new CityItem(name);
        result.uiName = json.uiName;
        result.lvlMax = 1;
        result.isTech = true;
        result.desc = json.desc;
        result.prerequisites = (typeof(json.prereq) === "undefined") ? [] : json.prereq;
        result.iconPath = process.env.PUBLIC_URL + "/images/tech_icons/icon_" + name + ".png";
        return result;
    }

    fullfillsPrerequisites(presentPrerequisites: {reqName: string, reqLvl: number}[]): boolean
    {
        for (let i: number = 0; i < this.prerequisites.length; i++)
        {
            const present: {reqName: string, reqLvl: number} | undefined = presentPrerequisites.find(x => x.reqName === this.prerequisites[i].reqName);
            if (typeof(present) !== "undefined")
            {
                if (this.prerequisites[i].reqLvl > present.reqLvl){return false;}
            }
            else{return false;}
        }
        return true;
    }
}

export default CityItem;
