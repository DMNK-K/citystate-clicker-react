import CityItem from "./CityItem";
import buildings from "../json_data/buildings.json";
import tech from "../json_data/techs.json";
import Resources from "./Resources";
import GameplayStartConfig from "../config/GameplayStartConfig";
import TimeConfig from "../config/TimeConfig";
import CityItemSaveInterface from './CityItemSaveInterface';

/**
 * Class for loading gameplay data either from previous progress, or from Config
 * For the sake of not loading the same prerequisites for loading things many times, it needs an instance
 * and is not used as if it were static - instead upon instantiation it preloads stuff that is required
 * for many functions (eg buildings are needed for separate 3 functions) and then does aditional processing
 * only when data is requested using one of those functions.
 */
class Loader
{
    readonly saveExists: boolean;
    readonly allBld: CityItem[] = [];
    readonly allTech: CityItem[] = [];
    readonly savedBld: CityItemSaveInterface[] = [];
    readonly savedTech: CityItemSaveInterface[] = [];
    readonly presentPrerequisites: {reqName: string, reqLvl: number}[] = [];

    constructor()
    {
        this.saveExists = true;
        if (localStorage.getItem("bld") === null) {this.saveExists = false;}
        if (localStorage.getItem("tech") === null) {this.saveExists = false;}
        if (localStorage.getItem("res") === null) {this.saveExists = false;}
        if (localStorage.getItem("happ") === null) {this.saveExists = false;}
        if (localStorage.getItem("pop") === null) {this.saveExists = false;}
        if (localStorage.getItem("tick") === null) {this.saveExists = false;}
        if (localStorage.getItem("day") === null) {this.saveExists = false;}
        if (localStorage.getItem("year") === null) {this.saveExists = false;}
        this.preloadBuildingsJSON();
        this.preloadTechJSON();
        if (this.saveExists)
        {
            let saved: CityItemSaveInterface[] = JSON.parse(localStorage.getItem("bld") as string) as CityItemSaveInterface[];
            for (let i: number = 0; i < saved.length; i++)
            {
                this.savedBld.push(saved[i]);
                this.presentPrerequisites.push({reqName: saved[i].name, reqLvl: saved[i].lvl});
            }
            saved = JSON.parse(localStorage.getItem("tech") as string) as CityItemSaveInterface[];
            for (let i: number = 0; i < saved.length; i++)
            {
                this.savedTech.push(saved[i]);
                this.presentPrerequisites.push({reqName: saved[i].name, reqLvl: saved[i].lvl});
            }
        }
    }

    /**Creates CityItem array of all buildings in the game based on data from json */
    preloadBuildingsJSON(): void
    {
        let key: keyof typeof buildings;
        for (key in buildings)
        {
            this.allBld.push(CityItem.createBuildingFromJSON(key, buildings[key]));
        }
    }

    /**Creates CityItem array of all technologies in the game based on data from json */
    preloadTechJSON(): void
    {
        let key: keyof typeof tech;
        for (key in tech)
        {
            this.allBld.push(CityItem.createTechFromJSON(key, tech[key]));
        }
    }


    loadBuiltBuildings(): CityItem[]
    {
        const bld: CityItem[] = [];
        if (this.saveExists)
        {
            for (let i: number = 0; i < this.savedBld.length; i++)
            {
                const loaded: CityItem | undefined = this.allBld.find(x => x.name === this.savedBld[i].name);
                if (typeof(loaded) !== "undefined")
                {
                    loaded.impartSaveData(this.savedBld[i]);
                    bld.push(loaded);
                }
            }
        }
        return bld;
    }

    loadAvailableBuildings(): CityItem[]
    {
        //in the event of a lack of savefile, presentPrerequisites is an empty array, so the only bld that will
        //be available are the ones that have no prerequisites
        return this.allBld.filter(x => x.fullfillsPrerequisites(this.presentPrerequisites) && !this.savedBld.some(y => y.name === x.name));
    }

    loadUnavailableBuildings(): CityItem[]
    {
        return this.allBld.filter(x => !x.fullfillsPrerequisites(this.presentPrerequisites) && !this.savedBld.some(y => y.name === x.name));
    }

    loadResearchedTech(): CityItem[]
    {
        const tech: CityItem[] = [];
        if (this.saveExists)
        {
            for (let i: number = 0; i < this.savedTech.length; i++)
            {
                const loaded: CityItem | undefined = this.allTech.find(x => x.name === this.savedTech[i].name);
                if (typeof(loaded) !== "undefined")
                {
                    loaded.impartSaveData(this.savedTech[i]);
                    tech.push(loaded);
                }
            }
        }
        return tech;
    }

    loadAvailableTech(): CityItem[]
    {
        return this.allTech.filter(x => x.fullfillsPrerequisites(this.presentPrerequisites) && !this.savedTech.some(y => y.name === x.name));
    }

    loadUnavailableTech(): CityItem[]
    {
        return this.allTech.filter(x => !x.fullfillsPrerequisites(this.presentPrerequisites) && !this.savedTech.some(y => y.name === x.name));
    }

    loadResources(): Resources
    {
        if (!this.saveExists) {return GameplayStartConfig.startingResources;}
        return Resources.createFromJSON(JSON.parse(localStorage.getItem("res") as string) as {food: number, wood:number, stone:number, metal:number, currency:number, knowledge:number});
    }

    loadStorage(): Resources
    {
        const result = GameplayStartConfig.startingStorage;
        const items: CityItem[] = [...this.loadBuiltBuildings(), ...this.loadResearchedTech()];
        for (let i: number = 0; i < items.length; i++)
        {
            result.add(items[i].allAddedStorage);
        }
        return result;
    }

    loadPop(): number
    {
        return (this.saveExists) ? parseInt(localStorage.getItem("pop") as string, 10) : GameplayStartConfig.startingPop;
    }

    loadHapp(): number
    {
        return (this.saveExists) ? parseFloat(localStorage.getItem("happ") as string) : GameplayStartConfig.startingHapp;
    }

    loadTicks(): number
    {
        return (this.saveExists) ? parseInt(localStorage.getItem("tick") as string, 10) : 0;
    }

    loadDay(): number
    {
        return (this.saveExists) ? parseInt(localStorage.getItem("day") as string, 10) : 0;
    }

    loadYear(): number
    {
        return (this.saveExists) ? parseInt(localStorage.getItem("year") as string, 10) : 0;
    }
}

export default Loader;