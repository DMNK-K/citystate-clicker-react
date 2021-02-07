/**Class for saving gameplay data */
import CityItem from './CityItem';
import Resources from './Resources';
import CityItemSaveInterface from './CityItemSaveInterface';


class Saver
{
    private static savingOn: boolean = true;
    static get savingAllowed(): boolean {return this.savingOn;}

    /**Saves game if saving is on. Do Saver.savingAllowed to see if it is. */
    static saveGame(resources: Resources, happ: number, pop: number, items: CityItem[], tick: number, day:number, year:number): void
    {
        if (!this.savingOn){return;}
        const bldArr: string[] = [];
        const techArr: string[] = [];
        for (let i: number = 0; i < items.length; i++)
        {
            const saveObj: CityItemSaveInterface = {
                name: items[i].name,
                isInProgress: items[i].isInProgress,
                progress: items[i].progress,
                lvl: items[i].lvl
            };
            
            if (items[i].isTech)
            {
                techArr.push(JSON.stringify(saveObj));
            }
            else
            {
                bldArr.push(JSON.stringify(saveObj));
            }
        }
        localStorage.setItem("res", JSON.stringify(resources));
        localStorage.setItem("pop", "" + pop);
        localStorage.setItem("happ", "" + happ)
        localStorage.setItem("bld", JSON.stringify(bldArr));
        localStorage.setItem("tech", JSON.stringify(techArr));
        //even though day and year could be inferred by the number of ticks and TimeConfig settings,
        //they are saved anyway, because in the future time settings might change and it will mess with saves
        localStorage.setItem("tick", "" + tick);
        localStorage.setItem("day", "" + day);
        localStorage.setItem("year", "" + year);
    }

    static clearSave()
    {
        localStorage.removeItem("res");
        localStorage.removeItem("pop");
        localStorage.removeItem("happ");
        localStorage.removeItem("bld");
        localStorage.removeItem("tech");
        localStorage.removeItem("tick");
        localStorage.removeItem("day");
        localStorage.removeItem("year");
    }

    static unlockSaving()
    {
        this.savingOn = true;
    }

    static lockSaving()
    {
        this.savingOn = false;
    }
}

export default Saver;