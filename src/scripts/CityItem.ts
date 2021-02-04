import Resources from "./Resources";

class CityItem
{
    name: string = "";
    uiName: string = "";
    desc: string = "";
    iconName: string = "";

    isTech: boolean = false;
    isInProgress: boolean = false;

    lvl: number = 0;
    lvlMax: number = 1;

    prerequisites: string[] = [];
    
    labours: number[] = [10];
    costs: Resources[] = [Resources.zero];
    profits: Resources[] = [Resources.zero];

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

    get canLvlUp(): boolean {return this.lvl < this.lvlMax && !this.isInProgress;}
}

export default CityItem;