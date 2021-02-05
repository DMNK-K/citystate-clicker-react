/**Class for saving gameplay data */
import CityItem from './CityItem';
import Resources from './Resources';
class Saver
{
    saveGame(resources: Resources, happ: number, pop: number, items: CityItem[], ticks: number): void
    {
        const bldArr: string[] = [];
        const techArr: string[] = [];
        for (let i: number = 0; i < items.length; i++)
        {
            if (items[i].isTech)
            {
                techArr.push(items[i].name);
            }
            else
            {
                bldArr.push(items[i].name);
            }
        }
        localStorage.setItem("res", JSON.stringify(resources));
        localStorage.setItem("pop", "" + pop);
        localStorage.setItem("happ", "" + happ)
        localStorage.setItem("bld", JSON.stringify(bldArr));
        localStorage.setItem("tech", JSON.stringify(techArr));
        localStorage.setItem("ticks", "" + ticks);
    }
}

export default Saver;